from pydantic import BaseModel, Field

from uuid import UUID
from enum import Enum

from src.database.models.user_setting import UserSettings
from src.database.models.user import User
from src.schemas.user_settings import UserSettingsJson, UserSettingsResponse


class UserResponse(BaseModel):
    id: UUID
    name: str
    email: str
    createdAt: int
    settings: UserSettingsJson

    @classmethod
    def from_model(cls, user: User, settings: UserSettings):
        return cls(
            id = user.id,
            name = user.name,
            email = user.email,
            createdAt = int(user.created_at.timestamp() * 1000),
            settings = UserSettingsJson.model_validate(settings.settings)
        )
