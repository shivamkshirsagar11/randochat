from pydantic import BaseModel
from typing import Optional

# Pydantic model for User validation
class User(BaseModel):
    username: str
    # Add any additional fields if needed like email or profile picture

    class Config:
        # Ensure that the model is compatible with MongoDB documents
        from_attributes = True