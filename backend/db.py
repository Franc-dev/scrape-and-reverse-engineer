"""Database engine, sessions and first-use schema bootstrap.

Hosted Postgres providers (Neon, Supabase, Railway, Heroku) hand out URLs like
`postgresql://user:pass@host/db?sslmode=require&channel_binding=require`. SQLAlchemy would pick a
sync/psycopg driver for that and asyncpg rejects the libpq-only query parameters, so every URL is
normalised here before the engine is built.
"""

import asyncio
import logging
import uuid
from collections.abc import AsyncIterator
from typing import Any

from sqlalchemy import text
from sqlalchemy.engine import URL, make_url
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.pool import NullPool

from settings import DEFAULT_DATABASE_URL, settings

log = logging.getLogger("nebtech.db")

POSTGRES_DRIVERS = {
    "postgres",
    "postgresql",
    "postgresql+psycopg",
    "postgresql+psycopg2",
    "postgresql+asyncpg",
}
# libpq connection options that asyncpg does not understand as keyword arguments.
LIBPQ_ONLY = {
    "sslmode",
    "sslrootcert",
    "sslcert",
    "sslkey",
    "sslcrl",
    "channel_binding",
    "options",
    "target_session_attrs",
    "application_name",
    "connect_timeout",
    "gssencmode",
}
CONNECT_TIMEOUT_SECONDS = 8
SCHEMA_LOCK_KEY = 724_001  # arbitrary app-wide id for the advisory lock


class Base(DeclarativeBase):
    pass


class DatabaseNotConfigured(RuntimeError):
    """DATABASE_URL is missing on a host that has no local database."""


def prepare_database_url(raw: str) -> tuple[URL, dict[str, Any]]:
    """Return an asyncpg-ready URL plus the connect_args it needs."""
    url = make_url(raw.strip())
    if url.drivername not in POSTGRES_DRIVERS:
        return url, {}  # e.g. sqlite+aiosqlite: leave untouched

    query = dict(url.query)
    sslmode = query.get("sslmode")
    if isinstance(sslmode, tuple):
        sslmode = sslmode[-1]
    host = url.host or ""
    pooled = "pooler" in host or "pgbouncer" in host or "pgbouncer" in query
    url = url.set(
        drivername="postgresql+asyncpg",
        query={k: v for k, v in query.items() if k not in LIBPQ_ONLY and k != "pgbouncer"},
    )

    connect_args: dict[str, Any] = {"timeout": CONNECT_TIMEOUT_SECONDS}
    if sslmode:
        connect_args["ssl"] = sslmode  # asyncpg accepts the same words as libpq
    if pooled:
        # PgBouncer in transaction mode can't keep server-side prepared statements.
        connect_args.update(
            statement_cache_size=0,
            prepared_statement_cache_size=0,
            prepared_statement_name_func=lambda: f"__asyncpg_{uuid.uuid4()}__",
        )
    return url, connect_args


def build_engine(raw_url: str, *, serverless: bool = False) -> AsyncEngine:
    url, connect_args = prepare_database_url(raw_url)
    options: dict[str, Any] = {"connect_args": connect_args}
    if serverless:
        # Each invocation may land on a frozen or new instance: don't hold connections between them.
        options["poolclass"] = NullPool
    else:
        options["pool_pre_ping"] = True
    return create_async_engine(url, **options)


_engine: AsyncEngine | None = None
_sessionmaker: async_sessionmaker[AsyncSession] | None = None
_schema_ready = False
_schema_lock = asyncio.Lock()


def get_engine() -> AsyncEngine:
    """Build the engine on first use, so a bad DATABASE_URL can't stop the app from importing."""
    global _engine, _sessionmaker
    if _engine is None:
        if settings.serverless and settings.database_url == DEFAULT_DATABASE_URL:
            raise DatabaseNotConfigured("DATABASE_URL is not set")
        _engine = build_engine(settings.database_url, serverless=settings.serverless)
        _sessionmaker = async_sessionmaker(_engine, expire_on_commit=False)
    return _engine


async def dispose_engine() -> None:
    global _engine, _sessionmaker, _schema_ready
    if _engine is not None:
        await _engine.dispose()
    _engine, _sessionmaker, _schema_ready = None, None, False


async def ensure_schema() -> None:
    """Create any missing tables once per process (idempotent, safe for parallel cold starts)."""
    global _schema_ready
    if _schema_ready or not settings.create_tables_on_start:
        return
    async with _schema_lock:
        if _schema_ready:
            return
        import models  # noqa: F401  (registers the tables on Base.metadata)

        async with get_engine().begin() as conn:
            if conn.dialect.name == "postgresql":
                # Held until this transaction ends, so two instances can't race on CREATE TABLE.
                await conn.execute(
                    text("SELECT pg_advisory_xact_lock(:key)"), {"key": SCHEMA_LOCK_KEY}
                )
            await conn.run_sync(Base.metadata.create_all)
        _schema_ready = True
        log.info("database schema is ready")


async def get_db() -> AsyncIterator[AsyncSession]:
    get_engine()
    await ensure_schema()
    assert _sessionmaker is not None
    async with _sessionmaker() as session:
        yield session
