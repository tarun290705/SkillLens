import React from "react";
import { useNavigate } from "react-router-dom";
import "./RoleSelection.css";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    navigate("/register", { state: { role } });
  };

  return (
    <div className="role-container">
      {/* Floating Emojis */}
      <div className="emoji emoji-top-left">🎓</div>
      <div className="emoji emoji-top-right">💼</div>
      <div className="emoji emoji-bottom-left">📈</div>
      <div className="emoji emoji-bottom-right">🏆</div>

      {/* SkillLens Heading */}
      <h1 className="main-heading">
        SkillLens <span className="spark">✨</span>
      </h1>

      <div className="role-card">
        <h1 className="role-heading">🎯 Select Your Role</h1>
        <p className="role-subtext">
          Choose how you want to continue your journey 🚀
        </p>

        <div className="role-buttons">
          <button
            className="role-btn student"
            onClick={() => handleSelect("student")}
          >
            🎓 Student
          </button>
          <button
            className="role-btn officer"
            onClick={() => handleSelect("officer")}
          >
            🧑‍💼 Placement Officer
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
