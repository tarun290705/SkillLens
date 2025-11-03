import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registered successfully!");
  };

  return (
    <div className="auth-container">
      {/* Main Heading */}
      <h1 className="main-heading">SkillLens</h1>

      <div className="auth-box">
        <div className="auth-left">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Register</button>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="link">
                Login
              </Link>
            </p>
          </form>
        </div>

        <div className="auth-right">
          <h2>Welcome!</h2>
          <p>Join SkillLens and start your placement journey today.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
