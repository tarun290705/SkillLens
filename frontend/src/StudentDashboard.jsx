import React, { useState } from "react";
import "./Dashboard.css";
import backgroundImage from "./assets/dashboard-bg.png"; // ✅ Ensure this path is correct

const StudentDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("Profile");

  return (
    <div className="dashboard-wrapper">
      {/* Background Image */}
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Main Content */}
      <div className="dashboard-container">
        {/* Toolbar */}
        <header className="toolbar fixed-toolbar">
          {/* Left - Brand */}
          <h1 className="brand-name">SkillLens</h1>

          {/* Right - Buttons + Notifications */}
          <div className="toolbar-right">
            <button className="toolbar-btn" onClick={() => setSelectedSection("Profile")}>
              Profile
            </button>
            <button className="toolbar-btn" onClick={() => setSelectedSection("Placement Predictions")}>
              Placement Predictions
            </button>
            <button className="toolbar-btn" onClick={() => setSelectedSection("Upskilling")}>
              Upskilling
            </button>
            <button className="toolbar-btn" onClick={() => setSelectedSection("Skill Extractor")}>
              Skill Extractor
            </button>

            <button className="notification-btn" title="Notifications">
              🔔
              <span className="notification-badge">2</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="dashboard-body">
          <section className="dashboard-section">
            <h2>🎓 {selectedSection}</h2>
            <p>
              Welcome to the {selectedSection} section! Manage your placement activities,
              check insights, and improve your readiness.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
