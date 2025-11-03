import React, { useState } from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";

const RegisterPage = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (onRegister) onRegister(username, email);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-cyan-900 to-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex w-[750px] bg-[#0c1a25] rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Left Section */}
        <div className="w-1/2 bg-gradient-to-br from-cyan-600 to-teal-500 flex flex-col justify-center items-center text-center p-10">
          <h2 className="text-4xl font-bold mb-2">WELCOME BACK!</h2>
          <p className="text-sm text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-sm mb-2">Username</label>
              <div className="flex items-center border-b border-gray-500 pb-2">
                <i className="fa fa-user mr-2"></i>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-transparent w-full focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">Email</label>
              <div className="flex items-center border-b border-gray-500 pb-2">
                <i className="fa fa-envelope mr-2"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent w-full focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2">Password</label>
              <div className="flex items-center border-b border-gray-500 pb-2">
                <i className="fa fa-lock mr-2"></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent w-full focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full text-white font-semibold hover:opacity-90 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="switch-text">
  Already have an account? <Link to="/">Login</Link>
</p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
