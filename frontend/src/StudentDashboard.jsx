import React, { useState } from "react";
import "./Dashboard.css";

const StudentDashboard = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Skill Extractor");

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one file!");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/extract-multi/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      setSkills(data.skills || []);
    } catch (error) {
      console.error(error);
      alert("Error extracting skills");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container dark-mode full-page">
      {/* Toolbar */}
      <header className="toolbar">
        <h1 className="brand-name">SkillLens</h1>

        <div className="toolbar-right">
          {/* Dropdown for sections */}
          <div className="dropdown">
            <label htmlFor="section" className="dropdown-label">
              Section:
            </label>
            <select
              id="section"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="dropdown-select"
            >
              <option>Profile</option>
              <option>Placement Predictions</option>
              <option>Upskilling</option>
              <option>Skill Extractor</option>
            </select>
          </div>

          {/* Notification button */}
          <button className="notification-btn" title="Notifications">
            🔔
            <span className="notification-badge">2</span>
          </button>
        </div>
      </header>

      <main className="dashboard-body">
        {/* Dynamic content based on section */}
        {selectedSection === "Profile" && (
          <section className="dashboard-section">
            <h2>👤 Your Profile</h2>
            <p>View and update your personal and academic details.</p>
            <button>View Profile</button>
          </section>
        )}

        {selectedSection === "Placement Predictions" && (
          <section className="dashboard-section">
            <h2>📊 Placement Predictions</h2>
            <p>Check your employability score and AI-based insights.</p>
            <button>View Prediction</button>
          </section>
        )}

        {selectedSection === "Upskilling" && (
          <section className="dashboard-section">
            <h2>📚 Upskilling</h2>
            <p>Find courses and certifications to boost your skills.</p>
            <button>Explore Courses</button>
          </section>
        )}

        {selectedSection === "Skill Extractor" && (
          <section className="dashboard-section">
            <h2>💡 Skill Extractor</h2>
            <p>Upload your resumes or project files to detect skills using AI.</p>

            <div className="upload-section">
              <div className="upload-box">
                <label htmlFor="file-upload" className="custom-file-upload">
                  📂 Choose Files
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <button onClick={handleUpload} disabled={loading}>
                  {loading ? "Extracting..." : "Extract Skills"}
                </button>
              </div>

              {selectedFiles.length > 0 && (
                <p className="file-list">
                  Selected: {selectedFiles.map((f) => f.name).join(", ")}
                </p>
              )}
            </div>

            {skills.length > 0 && (
              <section className="skills-display">
                <h3>✨ Extracted Skills</h3>
                <div className="skills-grid">
                  {skills.map((skill, index) => (
                    <div key={index} className="skill-chip">
                      💡 {skill}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
