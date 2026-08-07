from datetime import datetime, timezone

from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import UUID

from src.repositories.user_settings_repository import UserSettingsRepository
from src.schemas.requests import UserSettingsRequest

from uuid import uuid4

def deep_merge(base: dict, update: dict):
    for key, value in update.items():
        if (
            key in base
            and isinstance(base[key], dict)
            and isinstance(value, dict)
        ):
            deep_merge(base[key], value)
        else:
            base[key] = value

    return base


class UserSettingsService:

    def __init__(self, db: Session):
        self.db = db

    def update_settings(self, id: UUID, request: UserSettingsRequest):
        repository = UserSettingsRepository(self.db)

        settings = repository.get_by_id(id)

        updates = request.model_dump(exclude_unset=True)

        for field, value in updates.items():
            setattr(settings, field, value)

        settings.updated_at = datetime.now(timezone.utc)

        return repository.save(settings)

