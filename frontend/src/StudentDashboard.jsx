import React, { useState } from "react";
import "./Dashboard.css";
import backgroundImage from "./assets/dashboard-bg.png"; // ✅ Ensure this path is correct

const StudentDashboard = () => {
<<<<<<< HEAD
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
      const response = await fetch("http://127.0.0.1:8000/extract-multi/", {
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
=======
  const [selectedSection, setSelectedSection] = useState("Profile");
>>>>>>> 8af09b084a0131f64879b25a7f54792d455e55c1

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
