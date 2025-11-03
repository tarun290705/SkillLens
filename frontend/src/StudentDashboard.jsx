import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import backgroundImage from "./assets/dashboard-bg.png";

const StudentDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("Profile");
  const [resumeFiles, setResumeFiles] = useState([]);
  const [marksCardFiles, setMarksCardFiles] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle File Selection
  const handleResumeChange = (e) => {
    setResumeFiles(Array.from(e.target.files));
  };

  const handleMarksCardChange = (e) => {
    setMarksCardFiles(Array.from(e.target.files));
  };

  // Handle File Upload and API Call
  const handleUpload = async () => {
    if (resumeFiles.length === 0 && marksCardFiles.length === 0) {
      alert("⚠️ Please upload at least one file (Resume or Marks Card).");
      return;
    }

    const formData = new FormData();
    resumeFiles.forEach((file) => formData.append("files", file));
    marksCardFiles.forEach((file) => formData.append("files", file));

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/extract-multi/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to extract skills");

      const data = await response.json();
      setSkills(data.skills || []);
    } catch (error) {
      console.error(error);
      alert("❌ Error extracting skills. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Background Image */}
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Main Content */}
      <div className="dashboard-container">
        {/* Toolbar */}
        <header className="toolbar fixed-toolbar">
          <h1 className="brand-name">SkillLens</h1>

          <div className="toolbar-right">
            <button className="toolbar-btn" onClick={() => navigate("/profile")}>
              Profile
            </button>
            <button
              className="toolbar-btn"
              onClick={() => setSelectedSection("Placement Predictions")}
            >
              Placement Predictions
            </button>
            <button
              className="toolbar-btn"
              onClick={() => setSelectedSection("Upskilling")}
            >
              Upskilling
            </button>
            <button
              className="toolbar-btn"
              onClick={() => setSelectedSection("Skill Extractor")}
            >
              Skill Extractor
            </button>
            <button className="toolbar-btn" onClick={() => navigate("/library")}>
              📚 Library
            </button>
            <button className="notification-btn" title="Notifications">
              🔔
              <span className="notification-badge">2</span>
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="dashboard-body">
          <section className="dashboard-section">
            <h2>🎓 {selectedSection}</h2>

            {selectedSection === "Placement Predictions" ? (
              <div className="upload-section">
                <p>Select and upload your files for analysis:</p>

                <div className="upload-boxes">
                  {/* Resume Upload */}
                  <div className="upload-card">
                    <h3>📄 Upload Resume(s)</h3>
                    <input
                      type="file"
                      multiple
                      onChange={handleResumeChange}
                      className="file-input"
                    />
                  </div>

                  {/* Marks Card Upload */}
                  <div className="upload-card">
                    <h3>🎯 Upload Marks Card(s)</h3>
                    <input
                      type="file"
                      multiple
                      onChange={handleMarksCardChange}
                      className="file-input"
                    />
                  </div>
                </div>

                <button
                  className="upload-btn"
                  onClick={handleUpload}
                  disabled={loading}
                >
                  {loading ? "⏳ Extracting..." : "🚀 Extract Skills"}
                </button>

                {/* Results Section */}
                {skills.length > 0 && (
                  <div className="results-section">
                    <h3>🧠 Extracted Skills</h3>
                    <ul className="skills-list">
                      {skills.map((skill, index) => (
                        <li key={index} className="skill-item">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p>
                Welcome to the {selectedSection} section! Manage your placement
                activities, check insights, and improve your readiness.
              </p>
            )}
          </section>
        </main>

        {/* 💬 ChatBolt Icon */}
        <button
          className="chatbolt-icon"
          title="Open ChatBolt"
          onClick={() => navigate("/chatbolt")}
        >
          💬
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
