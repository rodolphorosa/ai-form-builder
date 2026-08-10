from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from src.database.session import get_db
from src.schemas.requests import LoginRequest
from src.services.auth import AuthService
from src.schemas.user import UserResponse

from src.database.models.user import User

from src.api.deps import get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post('/login')
def login(data: LoginRequest, response: Response, db: Session = Depends(get_db)):

    service = AuthService(db)

    result = service.login(email=data.email, password=data.password)

    user = result["user"]
    token = result["token"]

    response.set_cookie(
        key="session", 
        value=token, 
        httponly=True, 
        secure=False, 
        samesite="lax", 
        max_age=60 * 60 * 24 * 30, 
    )

    return {
        "data": UserResponse.from_model(user=user)
    }


@router.post('/logout')
def logout(db: Session = Depends(get_db)):
    pass


@router.get('/me')
def get_me(
    current_user: User = Depends(get_current_user)
):
    return current_user
