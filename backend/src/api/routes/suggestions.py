from src.llm.constants import CONTEXTS
from src.llm.factory import PROVIDERS
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.session import get_db
from src.database.models.form import Form
from src.database.models.project import Project
from src.schemas.form import FormResponse
from src.schemas.requests import SuggestionRequest
from src.services.suggestions import request_suggestion
from src.api.deps import get_llm_provider

router = APIRouter(prefix="/suggestions", tags=["Suggestions"])

@router.post('')
def suggest(data: SuggestionRequest):
    provider = get_llm_provider(data.provider, data.model)

    prompt = f"""
        Suggest improvements to {data.subject["label"]}.
        Your task is NOT to improve the whole field.

        Your task is to inspect ONLY the following properties:

        { CONTEXTS[data.context] }

        Ignore every other property of the field, even if it could be improved.

        Treat every other property as read-only.

        Current field: \n\n {data.subject}
        \n\n
    """

    suggestions = request_suggestion(prompt, provider)

    return { "data": suggestions }