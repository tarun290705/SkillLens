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

  const handleResumeChange = (e) => {
    setResumeFiles(Array.from(e.target.files));
  };

  const handleMarksCardChange = (e) => {
    setMarksCardFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
  if (resumeFiles.length === 0 || marksCardFiles.length === 0) {
    alert("⚠️ Please upload both Resume and Marks Card files.");
    return;
  }

  const formData = new FormData();
  formData.append("resume", resumeFiles[0]);
  formData.append("marks_card", marksCardFiles[0]);

  try {
    setLoading(true);
    const response = await fetch("http://127.0.0.1:8001/analyze-employability/", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to analyze employability");

    const data = await response.json();

    // Format as readable text
    const report = `
📊 Employability Analysis
──────────────────────────────
🎓 CGPA: ${data.cgpa}
💼 Placement Chance: ${data.placement_chance}
🧠 Technical Skills: ${data.skills.tech_skills.join(", ") || "None"}
🤝 Soft Skills: ${data.skills.soft_skills.join(", ") || "None"}
💬 Reason: ${data.reason}
`;

    setSkills(report);
  } catch (error) {
    console.error(error);
    alert("❌ Error analyzing employability. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="dashboard-wrapper">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      <div className="overlay"></div>

      <div className="dashboard-container">
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

            <button className="toolbar-btn" onClick={() => navigate("/gopro")}>
              ⭐ Go Pro
            </button>

            <button
              className="toolbar-btn"
              onClick={() => navigate("/upskilling")}
            >
              🚀 Upskilling
            </button>

            <button className="toolbar-btn" onClick={() => navigate("/learn")}>
              🎓 Learn
            </button>

            <button className="toolbar-btn" onClick={() => navigate("/alumni")}>
              🧑‍💼 Alumni
            </button>

            <button className="toolbar-btn" onClick={() => navigate("/library")}>
              📚 Library
            </button>

            {/* 💻 Code Editor Button */}
            <button className="toolbar-btn" onClick={() => navigate("/CodeEditor")}>
              💻 Code Editor
            </button>

            <button className="notification-btn" title="Notifications">
              🔔
              <span className="notification-badge">2</span>
            </button>
          </div>
        </header>

        <main className="dashboard-body">
          <section className="dashboard-section">
            <h2>🎓 {selectedSection}</h2>

            {selectedSection === "Placement Predictions" ? (
              <div className="upload-section">
                <p>Select and upload your files for analysis:</p>

                <div className="upload-boxes">
                  <div className="upload-card">
                    <h3>📄 Upload Resume(s)</h3>
                    <input
                      type="file"
                      multiple
                      onChange={handleResumeChange}
                      className="file-input"
                    />
                  </div>

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
                {/* Results Section */}
                {skills && (
  <div className="results-section">
    <h3>📊 Employability Report</h3>
    <pre className="report-box">{skills}</pre>
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
