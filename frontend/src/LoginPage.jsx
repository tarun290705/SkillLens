import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Auth.css";

const LoginPage = () => {
  const location = useLocation();
  const role = location.state?.role || "User";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logged in successfully as ${role}: ${username}`);
  };

  return (
    <div className="auth-container">
      {/* Main Heading */}
      <h1 className="main-heading">SkillLens</h1>

      <div className="auth-box">
        <div className="auth-left">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            <p>
              Don’t have an account?{" "}
              <Link to="/register" className="link">
                Sign Up
              </Link>
            </p>
          </form>
        </div>

        <div className="auth-right">
          <h2>Welcome Back!</h2>
          <p>Login to continue your journey as a {role}.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
