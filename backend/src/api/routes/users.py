from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from uuid import UUID

from src.database.session import get_db
from src.schemas.requests import  UserRequest
from src.services.user import UserService
from src.services.auth import AuthService

from src.schemas.requests import UserRequest
from src.schemas.user import UserResponse

router = APIRouter(prefix="/users", tags=["Users"])


@router.get('/{id}')
def get_user(id: UUID, db: Session = Depends(get_db)):
    service = UserService(db)


@router.post('')
def create_user(
    data: UserRequest, 
    response: Response, 
    db: Session = Depends(get_db)
):
    user_service = UserService(db)

    user = user_service.create_user(
        name=data.name, 
        email=data.email, 
        password=data.password
    )

    auth_service = AuthService(db)
    
    token = auth_service.create_user_session(user)

    response.set_cookie(
        key="session", 
        value=token, 
        httponly=True, 
        secure=False, 
        samesite="lax", 
        max_age=60 * 60 * 24 * 30, 
    )

    user_response = UserResponse.from_model(user)

    return { 
        "data": user_response 
    }
