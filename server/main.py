from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from db.mongodb import Mongodb
# from db.repository import message_repo
# from models.message import Message
from contextlib import asynccontextmanager
from typing import List
from routers import users as user_router

# Initialise App
app = FastAPI()

# Dictionary to hold WebSocket connections for each room
rooms = {}

class ConnectionManager:
    def __init__(self):
        self.active_sockets: List[WebSocket] = []
    
    async def connect(self, ws:WebSocket):
        await ws.accept()
        self.active_sockets.append(ws)
    
    def disconnect(self, ws: WebSocket):
        self.active_sockets.remove(ws)
    
    async def broadcast(self, message: str, ws: WebSocket):
        for conn in self.active_sockets:
            if conn != ws:
                await conn.send_text(message)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Connect to mongodb
    
    Mongodb.connect()
    print("Connected to mongodb")
    
    # return context
    yield
    
    # close mongodb connection
    Mongodb.close()
    print("Closed mongodb")

manager = ConnectionManager()

app = FastAPI(lifespan=lifespan)

@app.websocket("/ws/{room_name}")
async def websocket_endpoint(websocket: WebSocket, room_name: str, user_name: str):
    # Accept the WebSocket connection
    await websocket.accept()

    # Add the user to the appropriate room
    if room_name not in rooms:
        rooms[room_name] = []

    rooms[room_name].append(websocket)
    print(f"User connected to room {room_name}. Total users: {len(rooms[room_name])}")
    
    # recent_msgs = await message_repo.get_messages_by_room(room_name)
    # for msg in recent_msgs:
    #     websocket.send_json(
    #         {
    #             "sender":user_name,
    #             "message":message
    #         }
    #     )

    try:
        while True:
            # Wait for a message from the client
            message = await websocket.receive_json()

            # Broadcast the message to all users in the room
            for connection in rooms[room_name]:
                if connection != websocket:
                    await connection.send_json(message)

    except WebSocketDisconnect:
        rooms[room_name].remove(websocket)
        print(f"User disconnected from room {room_name}. Total users: {len(rooms[room_name])}")
        if len(rooms[room_name]) == 0:
            del rooms[room_name]  # Remove room if empty


app.include_router(user_router.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev only — use specific origin in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)