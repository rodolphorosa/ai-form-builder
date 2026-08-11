import hashlib
import secrets

from datetime import datetime, timedelta, timezone

from sqlalchemy import select
from sqlalchemy.orm import Session

from src.database.models.session import Session as UserSession
from src.database.models.user import User
from src.repositories.user_repository import UserRepository
from src.repositories.session_repository import SessionRepository

from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()

class AuthService:

    def __init__(self, db: Session):
        self.db = db

    def login(self, email: str, password: str):
        repository = UserRepository(self.db)

        user = repository.get_by_email(email)

        if not user:
            raise Exception("Invalid email or password")

        if not password_hash.verify(password, user.password):
            raise Exception("Invalid email or user")

        token = self.create_user_session(user)

        return { "user": user, "token":  token }

    
    def create_user_session(self, user: User) -> str:
        session_repository = SessionRepository(self.db)

        token = secrets.token_urlsafe(32)

        token_hash = hashlib.sha256(
            token.encode()
        ).hexdigest()

        session_repository.create(
            user_id=user.id,
            token_hash=token_hash,
            expires_at=datetime.now(timezone.utc) + timedelta(days=30)
        )

        return token



    async def get_user_from_session(
        self,
        token: str,
    ) -> User | None:

        token_hash = hashlib.sha256(
            token.encode("utf-8")
        ).hexdigest()

        result = self.db.execute(
            select(UserSession)
            .where(
                UserSession.token_hash == token_hash,
                UserSession.expires_at > datetime.now(timezone.utc),
            )
        )

        session = result.scalar_one_or_none()

        if session is None:
            return None

        result = self.db.execute(
            select(User)
            .where(User.id == session.user_id)
        )

        return result.scalar_one_or_none()


    def logout(self, token: str, user: User):
        token_hash = hashlib.sha256(
            token.encode()
        ).hexdigest()

        session = self.db.query(UserSession).filter(
            UserSession.token_hash == token_hash,
            UserSession.user_id == user.id,
        ).first()

        if session:
            self.db.delete(session)
            self.db.commit()