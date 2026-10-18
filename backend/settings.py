import json
from typing import Annotated

from pydantic import AliasChoices, Field, field_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict

# Only used by the sandbox / docker-compose, where a host called "db" exists.
DEFAULT_DATABASE_URL = "postgresql+asyncpg://forge:forge@db:5432/app"


class Settings(BaseSettings):
    """Every value comes from an environment variable (or .env / .env.local when developing)."""

    # Secrets saved through Forge live in the git-ignored .env.local, which wins.
    model_config = SettingsConfigDict(env_file=(".env", ".env.local"), extra="ignore")

    # Any Postgres URL works, including Neon's `postgresql://...?sslmode=require`: see db.py.
    database_url: str = DEFAULT_DATABASE_URL

    # Comma-separated (https://a.com,https://b.com) or a JSON list. "*" allows any origin.
    cors_origins: Annotated[list[str], NoDecode] = ["*"]

    # Token required (X-Admin-Token header) to list contact messages. Empty disables the endpoint.
    admin_token: str = ""

    # True on serverless hosts: no connection pool, and tables are created on first use.
    # Vercel sets VERCEL=1 automatically.
    serverless: bool = Field(default=False, validation_alias=AliasChoices("SERVERLESS", "VERCEL"))

    # Create missing tables on first database use. Defaults to `serverless`, because nobody runs
    # `alembic upgrade head` there. Locally Alembic owns the schema, so this stays off.
    auto_create_tables: bool | None = None

    @field_validator("cors_origins", mode="before")
    @classmethod
    def _split_origins(cls, value: object) -> object:
        if isinstance(value, str):
            value = value.strip()
            if value.startswith("["):
                return json.loads(value)
            return [item.strip().rstrip("/") for item in value.split(",") if item.strip()]
        return value

    @property
    def create_tables_on_start(self) -> bool:
        return self.serverless if self.auto_create_tables is None else self.auto_create_tables


settings = Settings()
