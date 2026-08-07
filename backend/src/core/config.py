from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str
    openai_api_key: str
    openai_model: str
    gemini_api_key: str

    default_user_name: str = "Admin"
    default_user_email: str = "admin@example.com"
    default_user_password: str = "admin"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )


settings = Settings()