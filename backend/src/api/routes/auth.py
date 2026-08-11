from fastapi import APIRouter, Depends, Request, Response, HTTPException
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

    try:
        result = service.login(email=data.email, password=data.password)
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail={
                "code": "INVALID_EMAIL_OR_PASSWORD",
                "message": "Invalid email or password"
            }
        )

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


@router.post("/logout")
def logout(
    request: Request,
    response: Response,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    service = AuthService(db)
    token = request.cookies.get("session")

    if token:
        service.logout(token, user)

    response.delete_cookie(
        key="session",
        httponly=True,
        secure=False,
        samesite="lax",
    )

    return { "message": "Logged out successfully" }


@router.get('/me')
def get_me(
    current_user: User = Depends(get_current_user)
):
    return { "data": current_user }
