from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from uuid import UUID

from src.database.session import get_db
from src.schemas.requests import  UserRequest
from src.services.user import UserService

from src.schemas.requests import UserRequest
from src.schemas.user import UserResponse

router = APIRouter(prefix="/users", tags=["Users"])


@router.get('/{id}')
def get_user(id: UUID, db: Session = Depends(get_db)):
    service = UserService(db)


@router.post('')
def create_user(data: UserRequest, db: Session = Depends(get_db)):
    service = UserService(db)

    result = service.create_user(data.name, data.email, data.password)

    return { "data": UserResponse.from_model(result["user"]) }