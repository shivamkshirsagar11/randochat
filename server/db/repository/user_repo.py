from db.mongodb import Mongodb
from models.user import User


async def create_user(user: User):
    db = Mongodb.db
    user_doc = user.model_dump()
    result = await db.users.insert_one(user_doc)
    
    return str(result.inserted_id)

async def get_user_by_name(value: str):
    db = Mongodb.db
    user_doc = await db.users.find_one({"username": value})
    return user_doc
    