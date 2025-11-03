import React, { useState } from "react";
import { registerUser } from "./api/auth";
import { useLocation, Link } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const location = useLocation();
  const selectedRole = location.state?.role || "student";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: selectedRole,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, role: selectedRole };
      const res = await registerUser(payload);
      alert(`Registered successfully as ${selectedRole}!`);
    } catch (error) {
      console.error(error);
      alert(error.error || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Main Heading */}
      <h1 className="main-heading">
        <span className="emoji-left">🎓</span>
        SkillLens
        <span className="emoji-right">💼</span>
      </h1>

      <div className="auth-box">
        <div className="auth-left">
          <h2>📝 Register</h2>
          <form onSubmit={handleSubmit}>
            <label>👤 Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label>🔒 Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "🚀 Register"}
            </button>

            <p>
              Already have an account?{" "}
              <Link to="/login" className="link">
                Login 🔑
              </Link>
            </p>
          </form>
        </div>

        <div className="auth-right">
          <h2>🎯 Welcome!</h2>
          <p>
            Join <b>SkillLens</b> and start your placement journey today. <br />
            💡 Build skills, 📊 track progress, and 💪 boost your employability!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
