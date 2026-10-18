import pytest

from db import build_engine, prepare_database_url
from settings import Settings

NEON = (
    "postgresql://neondb_owner:s3cret@ep-quiet-pond-123456-pooler.c-7.us-east-2.aws.neon.tech/neondb"
    "?sslmode=require&channel_binding=require"
)


SCHEMES = ["postgresql", "postgres", "postgresql+psycopg", "postgresql+psycopg2"]


@pytest.mark.parametrize("scheme", SCHEMES)
def test_hosted_url_becomes_asyncpg(scheme: str) -> None:
    url, args = prepare_database_url(NEON.replace("postgresql", scheme, 1))
    assert url.drivername == "postgresql+asyncpg"
    assert dict(url.query) == {}  # sslmode / channel_binding must not reach asyncpg
    assert url.database == "neondb"
    assert args["ssl"] == "require"


def test_pooler_host_disables_prepared_statement_cache() -> None:
    _, args = prepare_database_url(NEON)
    assert args["statement_cache_size"] == 0
    assert args["prepared_statement_name_func"]() != args["prepared_statement_name_func"]()


def test_direct_host_keeps_statement_cache() -> None:
    _, args = prepare_database_url("postgresql://u:p@ep-quiet-pond-123456.neon.tech/neondb?sslmode=require")
    assert "statement_cache_size" not in args


def test_sandbox_url_is_unchanged() -> None:
    url, args = prepare_database_url("postgresql+asyncpg://forge:forge@db:5432/app")
    assert url.render_as_string(hide_password=False) == "postgresql+asyncpg://forge:forge@db:5432/app"
    assert "ssl" not in args


async def test_engine_builds_without_psycopg() -> None:
    for serverless in (False, True):
        engine = build_engine(NEON, serverless=serverless)
        assert engine.dialect.driver == "asyncpg"
        await engine.dispose()


def test_cors_origins_accept_plain_and_json(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("CORS_ORIGINS", "https://a.example.com/, https://b.example.com")
    assert Settings().cors_origins == ["https://a.example.com", "https://b.example.com"]
    monkeypatch.setenv("CORS_ORIGINS", '["https://c.example.com"]')
    assert Settings().cors_origins == ["https://c.example.com"]


def test_vercel_enables_serverless_mode(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("SERVERLESS", raising=False)
    monkeypatch.setenv("VERCEL", "1")
    cfg = Settings()
    assert cfg.serverless and cfg.create_tables_on_start
    monkeypatch.delenv("VERCEL")
    assert not Settings().create_tables_on_start
