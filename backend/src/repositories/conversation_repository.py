from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import UUID

from src.database.models.conversation import Conversation


class ConversationRepository:
    def __init__(self, db: Session):
        self.db = db

    
    def create(self, form_id: UUID):
        conversation = Conversation(
            form_id=form_id
        )

        self.db.add(conversation)
        self.db.commit()
        self.db.refresh(conversation)

        return conversation


    def get_conversation_by_form(self, form_id: UUID):
        return self.db.query(Conversation).filter(Conversation.form_id == form_id).first()
