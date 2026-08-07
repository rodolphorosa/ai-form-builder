import os

from dotenv import load_dotenv

from src.database.base import Base
from src.database.session import engine

from sqlalchemy.orm import Session

from src.database.models.project import Project
from src.database.models.form import Form
from src.database.models.conversation import Conversation
from src.database.models.message import Message
from src.database.models.system_setting import SystemSettings
from src.database.models.user_setting import UserSettings
from src.database.models.user import User

from src.schemas.user_settings import UserSettingsJson

from pwdlib import PasswordHash

from src.core.config import settings

load_dotenv(override=True)
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

        session.commit()


def init_db():
    Base.metadata.create_all(bind=engine)
    create_default_data()