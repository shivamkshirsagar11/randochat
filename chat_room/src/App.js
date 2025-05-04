import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RoomOptions from "./pages/RoomOptions";
import RoomNamePrompt from "./pages/RoomNamePrompt";
import ChatScreen from "./pages/ChatScreen";

function App() {
  const [user, setUser] = useState(null);
  const [step, setStep] = useState("login"); // login → options → roomname
  const [roomMode, setRoomMode] = useState(""); // "create" or "join"
  const [room, setRoom] = useState(""); // "create" or "join"
  const [socket, setSocket] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
    setStep("options");
  };

  const handleCreateRoom = () => {
    setRoomMode("create");
    setStep("roomname");
  };

  const handleJoinRoom = () => {
    setRoomMode("join");
    setStep("roomname");
  };

  const handleRoomSubmit = (roomName) => {
    const socket = new WebSocket(`ws://localhost:8000/ws/${roomName}?user_name=${user}`);
    setStep("chat");
    setRoom(roomName)
    setSocket(socket);
  };

  return (
    <>
      {step === "login" && <LoginPage onLogin={handleLogin} />}
      {step === "options" && (
        <RoomOptions onCreate={handleCreateRoom} onJoin={handleJoinRoom} />
      )}
      {step === "roomname" && (
        <RoomNamePrompt mode={roomMode} onSubmit={handleRoomSubmit} />
      )}
      {step === "chat" && (
        <ChatScreen username={user} room={room} socket={socket} setSocket={setSocket} user_name={user}/>
      )}
    </>
  );
}

export default App;
