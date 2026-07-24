from fastapi import APIRouter
from src.api.routes import forms, projects, suggestions

api_router = APIRouter()

api_router.include_router(forms.router)
api_router.include_router(projects.router)
api_router.include_router(suggestions.router)