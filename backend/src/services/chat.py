
from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import UUID

from src.repositories.conversation_repository import ConversationRepository
from src.repositories.message_repository import MessageRepository

class ChatService:
    def __init__(self, db: Session):
        self.db = db


    def create_conversation(self, form_id: UUID):
        repository = ConversationRepository(self.db)

        conversation = repository.create(form_id=form_id)

        if not conversation:
            raise Exception("Could not create conversation")

        return conversation


    def create_message(self, form_id: UUID, role: str, content: str, snapshot: dict | None):
        conversation_repository = ConversationRepository(self.db)
        message_repository = MessageRepository(self.db)

        conversation = conversation_repository.get_conversation_by_form(form_id=form_id)

        if not conversation:
            raise Exception("Could not find conversation")

        repository = MessageRepository(self.db)

        message = repository.create(
            conversation_id=conversation.id,
            role=role,
            content=content,
            snapshot=snapshot
        )

        if not message:
            raise Exception("Could not create message")

        return message


    def get_conversation(self, form_id: UUID):
        conversation_repository = ConversationRepository(self.db)
        message_repository = MessageRepository(self.db)

        conversation = conversation_repository.get_conversation_by_form(form_id=form_id)

        if not conversation:
            raise Exception("Could not find conversation")

        messages = message_repository.get_messages_by_conversation(conversation_id=conversation.id)

        return { "id": conversation.id, "messages": messages }