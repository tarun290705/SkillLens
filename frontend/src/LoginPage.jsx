import React, { useState } from "react";
import { Link } from "react-router-dom";  // ← Add this
import "./Auth.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logged in successfully as ${username}`);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* Left Side */}
        <div className="auth-left">
          <h2 className="auth-title">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>
              <div className="input-wrapper">
                <i className="fa fa-user icon"></i>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <i className="fa fa-lock icon"></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn">
              Login
            </button>

            <p className="switch-text">
              Don’t have an account?{" "}
              <Link to="/register">Sign Up</Link> {/* ← directs to RegisterPage */}
            </p>
          </form>
        </div>

        {/* Right Side */}
        <div className="auth-right">
          <h2>Hello, Friend!</h2>
          <p>Enter your personal details and start your journey with us.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
