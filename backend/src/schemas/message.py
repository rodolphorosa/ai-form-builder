from pydantic import BaseModel
from uuid import UUID

from src.database.models.message import Message
from src.schemas.schema import FormSchema, Role

class MessageResponse(BaseModel):
    id: UUID
    createdAt: int
    role: Role
    content: str
    snapshot: FormSchema | None

    @classmethod
    def from_model(cls, message: Message) -> Message:
        return cls(
            id = message.id,
            createdAt = int(message.created_at.timestamp() * 1000),
            role = message.role,
            content = message.content,
            snapshot = message.snapshot
        )
