from pydantic import BaseModel
from uuid import UUID

from src.database.models.conversation import Conversation

class ConversationResponse(BaseModel):
    id: UUID
    formId: UUID
    createdAt: int
    updatedAt: int
    
    @classmethod
    def from_model(cls, conversation: Conversation) -> Conversation:
        return cls(
            id = conversation.id,
            formId = conversation.form_id,
            createdAt = int(conversation.created_at.timestamp() * 1000),
            updatedAt = int(conversation.updated_at.timestamp() * 1000)
        )
