from fastapi import Cookie, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from src.llm.factory import PROVIDERS

from src.database.models.user import User
from src.services.auth import AuthService

from src.database.session import get_db

def get_llm_provider(provider_type: str, model: str):
    provider_cls = PROVIDERS.get(provider_type)
    
    if provider_cls is None:
        raise ValueError(f"Unknown provider: {provider_type}")
    
    return provider_cls(model=model)


async def get_current_user(
    session: str | None = Cookie(default=None),
    db: AsyncSession = Depends(get_db),
) -> User:
    if not session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )

    auth_service = AuthService(db)

    user = await auth_service.get_user_from_session(session)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired session",
        )

    return user