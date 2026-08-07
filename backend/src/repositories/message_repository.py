from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import UUID

from src.database.models.message import Message

from src.schemas.schema import FormSchema, Role

class MessageRepository:
    def __init__(self, db: Session):
        self.db = db


    def create(self, conversation_id: UUID, role: str, content: str, snapshot: dict | None = None):
        message = Message(
            conversation_id=conversation_id,
            role=role,
            content=content,
            snapshot=snapshot
        )

        self.db.add(message)
        self.db.commit()
        self.db.refresh(message)

        return message


    def get_messages_by_conversation(self, conversation_id: UUID):
        return (
            self.db
            .query(Message)
            .filter(Message.conversation_id == conversation_id)
            .order_by(Message.created_at.asc())
            .all()
        )