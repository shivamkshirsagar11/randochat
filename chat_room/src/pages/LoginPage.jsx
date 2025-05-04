import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [showBox, setShowBox] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBox(true), 100); // slight delay for animation
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400">
      {/* Background Color Blur Bubbles */}
      <div className="absolute w-[60vw] h-[60vw] bg-purple-300 rounded-full opacity-30 filter blur-3xl top-[-20%] left-[-10%]"></div>
      <div className="absolute w-[50vw] h-[50vw] bg-blue-300 rounded-full opacity-30 filter blur-2xl bottom-[-10%] right-[-10%]"></div>

      {/* Animated Login Box */}
      {showBox && (
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="bg-white p-10 rounded-2xl shadow-2xl w-[90%] max-w-md text-center">
            <h1 className="text-2xl font-semibold mb-6 text-gray-700">Welcome! 👋</h1>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleLogin}
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Continue
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LoginPage;
