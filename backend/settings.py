from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Secrets saved through Mitsumi Forge live in the git-ignored .env.local, which wins.
    model_config = SettingsConfigDict(env_file=(".env", ".env.local"), extra="ignore")

    database_url: str = "postgresql+asyncpg://forge:forge@db:5432/app"
    cors_origins: list[str] = ["*"]


settings = Settings()
