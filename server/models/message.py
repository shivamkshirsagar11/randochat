from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Message(BaseModel):
    sender: str
    content: str
    timestamp: datetime = datetime.utcnow()
    room_name: str
    
    class Config:
        from_attributes = True