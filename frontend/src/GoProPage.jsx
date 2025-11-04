import React, { useState } from "react";
import "./GoProPage.css";

const GoProPage = () => {
  const [company, setCompany] = useState("");
  const [roadmap, setRoadmap] = useState(null);

  const generateRoadmap = () => {
    if (!company.trim()) {
      alert("⚠️ Please enter your dream company name!");
      return;
    }

    const roadmapSteps = [
      {
        emoji: "📘",
        title: "Master the Basics",
        description:
          "Brush up on DSA, OOPS, DBMS, OS, and Networking fundamentals.",
      },
      {
        emoji: "🚀",
        title: "Build Real Projects",
        description: `Create 2-3 impactful projects relevant to ${company}. Contribute to open source.`,
      },
      {
        emoji: "💬",
        title: "Enhance Communication",
        description:
          "Practice mock interviews, join hackathons, and improve confidence.",
      },
      {
        emoji: "📊",
        title: "Analyze & Prepare",
        description: `Study ${company}'s interview pattern, coding platforms, and HR style.`,
      },
      {
        emoji: "🏆",
        title: "Final Lap",
        description:
          "Revise, relax, and stay consistent. Believe in yourself — you’ve got this!",
      },
    ];

    setRoadmap(roadmapSteps);
  };

  return (
    <div className="gopro-page">
      <div className="glass-card">
        <h1>🌟 Go Pro: Your Dream Company Roadmap</h1>
        <p className="subtitle">
          Build your personalized preparation path for your dream company 🚀
        </p>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter your dream company (e.g. Google, Infosys, Amazon)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="company-input"
          />
          <button className="generate-btn" onClick={generateRoadmap}>
            🧭 Generate Roadmap
          </button>
        </div>

        {roadmap && (
          <div className="roadmap-section">
            <h2>🎯 Roadmap for {company}</h2>
            <div className="roadmap-timeline">
              {roadmap.map((step, index) => (
                <div key={index} className="timeline-step">
                  <div className="step-icon">{step.emoji}</div>
                  <div className="step-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoProPage;
