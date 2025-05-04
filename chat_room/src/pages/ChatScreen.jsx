import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ChatScreen = ({ username, room, socket, setSocket, user_name}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!socket) return;

    // Handle incoming messages from the server
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    // Reconnect WebSocket if the connection is closed
    socket.onclose = () => {
      console.log("WebSocket disconnected, attempting to reconnect...");
      setTimeout(() => {
        const newSocket = new WebSocket(`${process.env.REACT_APP_WS_URL}/${room}?user_name=${user_name}`);
        setSocket(newSocket);
      }, 1000); // Reconnect after 1 second
    };

    // Optionally: Handle the WebSocket error
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup WebSocket connection when component is unmounted
    return () => {
      socket.close();
    };
  }, [socket, room]); // Add `socket` and `room` as dependencies to re-run if they change

  useEffect(() => {
    // Scroll to the bottom when a new message is added
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      const msgObj = { sender: username, message: message.trim(), room };
      socket.send(JSON.stringify(msgObj));
      setMessages((prev) => [...prev, msgObj]);
      setMessage("");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
      {/* Header */}
      <div className="bg-white py-4 px-6 shadow-md text-center font-bold text-xl text-gray-700">
        Room: {room}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => {
          const isMine = msg.sender === username;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: isMine ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 max-w-xs break-words rounded-lg shadow-md text-sm ${
                  isMine
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {!isMine && (
                  <div className="text-xs font-semibold text-gray-500 mb-1">
                    {msg.sender}
                  </div>
                )}
                {msg.text}{msg.message}
              </div>
            </motion.div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white px-4 py-3 flex gap-2 items-center shadow-inner">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
