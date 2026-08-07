from datetime import datetime, timezone

from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import UUID

from src.repositories.user_settings_repository import UserSettingsRepository
from src.schemas.requests import UserSettingsRequest
from src.repositories.user_repository import UserRepository

from uuid import uuid4


class UserService:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, name: str, email: str, password: str):
        user_repository = UserRepository(self.db)

        user = user_repository.create(
            name=name, 
            email=email, 
            password=password
        )

        settings_repository = UserSettingsRepository(self.db)

        settings = settings_repository.create(user_id=user.id)

        return { "user": user, "settings": settings }


    def get_user_and_settings(self, email: str):
        user_repository = UserRepository(self.db)

        user = user_repository.get_by_email(email=email)

        if not user:
            raise Exception("Could not find user")

        settings_repository = UserSettingsRepository(self.db)

        settings = settings_repository.get_by_user(user_id=user.id)

        return { "user": user, "settings": settings }