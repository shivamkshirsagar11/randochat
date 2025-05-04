from fastapi import APIRouter, HTTPException
from models.user import User
from db.repository import user_repo


router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/")
async def register_user(user: User):
    existing_user = await user_repo.get_user_by_name(user.username)
    print(existing_user)
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User Already exists"
        )
    
    user_id = await user_repo.create_user(user)
    return {
        "user_id":user_id,
        "message":"User created!"
    }


@router.get("/{username}")
async def fetch_user(username: str):
    user = await user_repo.get_user_by_name(username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id":str(user['_id']),
        "username": user['username']
    }