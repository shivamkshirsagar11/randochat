import React from "react";
import { motion } from "framer-motion";
import "./WaveEffect.css";

const HoverWaveButton = ({ label, onClick, bgColor }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative"
    >
      <button
        onClick={onClick}
        className={`relative px-6 py-3 text-white text-lg font-medium rounded-md shadow-md overflow-hidden z-10 ${bgColor}`}
      >
        {label}
        <span className="wave-animation absolute bottom-[-6px] left-0 w-full h-2"></span>
      </button>
    </motion.div>
  );
};

const RoomOptions = ({ onCreate, onJoin }) => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400">
      {/* Background bubbles */}
      <div className="absolute w-[60vw] h-[60vw] bg-purple-300 rounded-full opacity-30 filter blur-3xl top-[-20%] left-[-10%]"></div>
      <div className="absolute w-[50vw] h-[50vw] bg-blue-300 rounded-full opacity-30 filter blur-2xl bottom-[-10%] right-[-10%]"></div>

      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-[90%] max-w-md text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">What would you like to do?</h2>

          <div className="flex flex-col gap-6 items-center">
            <HoverWaveButton label="Create Room" onClick={onCreate} bgColor="bg-blue-500" />
            <HoverWaveButton label="Join Room" onClick={onJoin} bgColor="bg-green-500" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RoomOptions;
