from core.config import settings
from motor.motor_asyncio import AsyncIOMotorClient

class Mongodb:
    client = None
    db = None
    
    @classmethod
    def connect(cls):
        cls.client = AsyncIOMotorClient(settings.MONGODB_URI)
        cls.db = cls.client[settings.DB_NAME]
    
    @classmethod
    def close(cls):
        cls.client.close()
