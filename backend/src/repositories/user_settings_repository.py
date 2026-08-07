from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import UUID

from src.database.models.user_setting import UserSettings

from src.schemas.user_settings import UserSettingsJson

class UserSettingsRepository:

    def __init__(self, db: Session):
        self.db = db
    
    def create(self, user_id: UUID):
        base_settings = UserSettingsJson()

        settings = UserSettings(
            settings = base_settings.model_dump(),
            user_id = user_id
        )

        self.db.add(settings)
        self.db.commit()
        self.db.refresh()

        return settings

    def get(self, id: UUID):
        return self.db.query(UserSettings).filter(UserSettings.id == id).first()

    def get_by_user(self, user_id: UUID):
        return self.db.query(UserSettings).filter(UserSettings.user_id == user_id).first()

    def save(self, settings: UserSettings):
        self.db.add(settings)
        self.db.commit()
        self.db.refresh(settings)

        return settings
