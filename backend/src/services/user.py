from sqlalchemy.orm import Session

from src.repositories.user_settings_repository import UserSettingsRepository
from src.repositories.user_repository import UserRepository
from src.repositories.project_repository import ProjectRepository
from src.domain.exceptions.user import EmailAlreadyExistsException

from src.services.auth import AuthService

from uuid import uuid4

from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()

class UserService:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, name: str, email: str, password: str):
        user_repository = UserRepository(self.db)
        project_repository = ProjectRepository(self.db)

        user = user_repository.get_by_email(email=email)

        if user != None:
            raise EmailAlreadyExistsException()

        user = user_repository.create(
            name=name, 
            email=email, 
            password=password
        )

        project_repository.create_user_default_project(user)

        settings_repository = UserSettingsRepository(self.db)

        settings_repository.create(user_id=user.id)

        return user


    def get_user_and_settings(self, email: str):
        user_repository = UserRepository(self.db)

        user = user_repository.get_by_email(email=email)

        if not user:
            raise Exception("Could not find user")

        settings_repository = UserSettingsRepository(self.db)

        settings = settings_repository.get_by_user(user_id=user.id)

        return { "user": user, "settings": settings }


    def login(self, email: str, password: str):
        repository = UserRepository(self.db)

        user = repository.get_by_email(email)

        if not user:
            raise Exception("Invalid email or password")

        if not password_hash.verify(password, user.password):
            raise Exception("Invalid email or user")

        return { "user": user }
