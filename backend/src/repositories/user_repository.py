from pwdlib import PasswordHash

from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import UUID

from src.database.models.user import User

password_hash = PasswordHash.recommended()

class UserRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(self, name: str, email: str, password: str):
        user = User(
            name = name,
            email = email,
            password = password_hash.hash(password)
        )

        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)

        return user

    def get_by_email(self, email: str):
        return self.db.query(User).filter(User.email == email).first()
