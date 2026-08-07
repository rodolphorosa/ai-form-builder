from pydantic import BaseModel, Field

from uuid import UUID
from enum import Enum

from src.database.models.user_setting import UserSettings

class AIProvider(str, Enum):
    GEMINI = "gemini"
    OLLAMA = "ollama"
    OPENAI = "openai"
    

class ThemeTypes(str, Enum):
    LIGHT = "light"
    DARK = "dark"
    SYSTEM = "system"


class Languages(str, Enum):
    PTBR = "ptbr"
    EN = "en"


class AI(BaseModel):
    preferred_provider: AIProvider = AIProvider.OPENAI
    preferred_model: str = "gpt-4.1-nano"


class Appearance(BaseModel):
    theme: ThemeTypes = ThemeTypes.LIGHT
    language: Languages = Languages.PTBR


class UserSettingsJson(BaseModel):
    ai: AI = Field(default_factory=AI)
    appearance: Appearance = Field(default_factory=Appearance)


class UserSettingsResponse(BaseModel):
    id: UUID
    settings: UserSettingsJson
    createdAt: int
    updatedAt: int

    model_config = {
        "from_attributes": True
    }

    @classmethod
    def from_model(cls, settings: UserSettings) -> "UserSettingsResponse":
        return cls(
            id = settings.id,
            settings = UserSettingsJson.model_validate(settings.settings),
            createdAt = int(settings.created_at.timestamp() * 1000),
            updatedAt = int(settings.updated_at.timestamp() * 1000),
        )