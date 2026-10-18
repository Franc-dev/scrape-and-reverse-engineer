import asyncio

import models  # noqa: F401  (registers models on Base.metadata)
from alembic import context
from db import Base, build_engine, prepare_database_url
from settings import settings

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    context.configure(
        url=prepare_database_url(settings.database_url)[0].render_as_string(hide_password=False),
        target_metadata=target_metadata,
        literal_binds=True,
    )
    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection) -> None:
    context.configure(connection=connection, target_metadata=target_metadata, compare_type=True)
    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online() -> None:
    engine = build_engine(settings.database_url, serverless=settings.serverless)
    async with engine.connect() as connection:
        await connection.run_sync(do_run_migrations)
    await engine.dispose()


if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())
