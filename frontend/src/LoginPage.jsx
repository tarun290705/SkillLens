import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Auth.css";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = location.state?.role || "User";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock login validation
    if (username && password) {
      // Redirect based on role
      if (role === "student") {
        navigate("/student-dashboard", { state: { username, role } });
      } else if (role === "placement") {
        navigate("/placement-dashboard", { state: { username, role } });
      } else {
        alert("Invalid role selected!");
      }
    } else {
      alert("Please enter valid credentials.");
    }
  };

  return (
    <div className="auth-container">
      {/* Heading */}
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
