from pwdlib import PasswordHash

from sqlalchemy.orm import Session
from src.database.session import engine
from src.database.models.user_setting import UserSettings
from src.database.models.user import User
from src.database.models.project import Project
from src.schemas.user_settings import UserSettingsJson

from src.core.config import settings

password_hash = PasswordHash.recommended()

def create_default_data():
    with Session(engine) as session:

        user = (
            session.query(User)
            .filter(User.email == settings.default_user_email)
            .first()
        )

        if not user:
            user = User(
                name=settings.default_user_name,
                email=settings.default_user_email,
                password=password_hash.hash(
                    settings.default_user_password
                )
            )

            session.add(user)
            session.flush()

        user_settings = (
            session.query(UserSettings)
            .filter(UserSettings.user_id == user.id)
            .first()
        )

        if not user_settings:
            user_settings = UserSettings(
                user_id=user.id,
                settings=UserSettingsJson().model_dump()
            )

            session.add(user_settings)

        default_project = (
            session.query(Project)
            .filter(Project.is_system == True)
            .first()
        )

        if not default_project:
            default_project = Project(
                name="My Forms",
                user_id=user.id,
                is_system=True
            )

            session.add(default_project)

        session.commit()
