from dotenv import load_dotenv
import os

load_dotenv()  # Load from .env

class Settings:
    MONGODB_URI: str = os.getenv("MONGODB_URI")
    DB_NAME: str = os.getenv("DB_NAME", "chat_app")

settings = Settings()
