import React, { useState } from "react";
import "./PlacementDashboard.css";
import backgroundImage from "./assets/dashboard-bg.png"; // background image path

const PlacementOfficerDashboard = () => {
  const [department, setDepartment] = useState("All Departments");

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  return (
    <div className="dashboard-wrapper">
      {/* Full Background Image */}
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Toolbar */}
      <header className="toolbar fixed-toolbar slide-up">
        <h1 className="brand-name">SkillLens</h1>
        <div className="toolbar-right">
          {/* Department Dropdown */}
          <select
            id="department"
            value={department}
            onChange={handleDepartmentChange}
            className="toolbar-dropdown"
          >
            <option>All Departments</option>
            <option>Computer Science</option>
            <option>Electronics</option>
            <option>Mechanical</option>
            <option>Civil</option>
            <option>Information Science</option>
          </select>

          {/* Notification Bell */}
          <button className="notification-btn" title="Notifications">
            🔔
            <span className="notification-badge">3</span>
          </button>
        </div>
      </header>

      {/* Middle Glass Box */}
      <main className="dashboard-body">
        <section className="dashboard-section">
          <h2>👨‍💼 Placement Officer Dashboard</h2>
          <p>
            Welcome to the Placement Officer Dashboard!  
            Manage department-wise placement data, analyze student performance,  
            and stay updated with the latest company drives.
          </p>
        </section>
      </main>
    </div>
  );
};

export default PlacementOfficerDashboard;
