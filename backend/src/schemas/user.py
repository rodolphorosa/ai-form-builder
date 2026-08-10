from pydantic import BaseModel

from uuid import UUID

from src.database.models.user import User


class UserResponse(BaseModel):
    id: UUID
    name: str
    email: str
    createdAt: int

    @classmethod
    def from_model(cls, user: User):
        return cls(
            id = user.id,
            name = user.name,
            email = user.email,
            createdAt = int(user.created_at.timestamp() * 1000)
        )
