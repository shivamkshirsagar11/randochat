import React, { useState } from "react";
import { motion } from "framer-motion";

const RoomNamePrompt = ({ mode, onSubmit }) => {
  const [roomName, setRoomName] = useState("");

  const handleSubmit = () => {
    if (roomName.trim()) {
      onSubmit(roomName.trim());
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400">
      {/* Reusing blurred bubbles */}
      <div className="absolute w-[60vw] h-[60vw] bg-purple-300 rounded-full opacity-30 filter blur-3xl top-[-20%] left-[-10%]"></div>
      <div className="absolute w-[50vw] h-[50vw] bg-blue-300 rounded-full opacity-30 filter blur-2xl bottom-[-10%] right-[-10%]"></div>

      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-[90%] max-w-md text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            {mode === "create" ? "Enter Room Name to Create" : "Enter Room Name to Join"}
          </h2>

          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="e.g. chill-zone"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Continue
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RoomNamePrompt;
