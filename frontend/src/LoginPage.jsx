import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "./api/auth";
import "./Auth.css";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = location.state?.role || "student";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = { username, password };
      const response = await loginUser(data);

      const userRole = response.user?.role || "student";

      alert(`Logged in successfully as ${userRole}: ${response.user.username}`);

      localStorage.setItem("token", response.access);
      localStorage.setItem("role", userRole);

      if (userRole === "student") {
        navigate("/student-dashboard");
      } else if (userRole === "officer") {
        navigate("/officer-dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials or role. Please try again.");
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
