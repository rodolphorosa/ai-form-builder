from datetime import datetime, timezone

from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import UUID

from src.database.models.session import Session as UserSession

class SessionRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        user_id: UUID,
        token_hash: str,
        expires_at: datetime,
    ):
        session = UserSession(
            user_id=user_id,
            token_hash=token_hash,
            expires_at=expires_at,
            created_at=datetime.now(timezone.utc),
        )

        self.db.add(session)
        self.db.commit()
        self.db.refresh(session)

        return session