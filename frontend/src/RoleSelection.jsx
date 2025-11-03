import React from "react";
import { useNavigate } from "react-router-dom";
import "./RoleSelection.css";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    navigate("/login", { state: { role } });
  };

  return (
    <div className="role-container">
      <div className="role-card">
        <h1 className="role-heading">🎯 Select Your Role</h1>
        <p className="role-subtext">Choose how you want to continue your journey 🚀</p>

        <div className="role-buttons">
          <button className="role-btn student" onClick={() => handleSelect("student")}>
            🎓 Student
          </button>
          <button className="role-btn officer" onClick={() => handleSelect("officer")}>
            🧑‍💼 Placement Officer
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
