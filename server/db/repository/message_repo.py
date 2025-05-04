from db.mongodb import Mongodb
from models.message import Message
from typing import List

async def save_message(message: Message):
    db = Mongodb.db
    message_doc = message.model_dump()  # Convert to dict to insert into MongoDB
    result = await db.messages.insert_one(message_doc)
    return str(result.inserted_id)

async def get_messages_by_room(room_name: str, limit: int = 20) -> List[dict]:
    db = Mongodb.db
    cursor = db.messages.find({"room_name": room_name}).sort("timestamp", -1).limit(limit)
    messages = [message async for message in cursor]
    return messages
