import React from "react";
import { FaArrowLeft, FaBuilding, FaBriefcase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./LibraryPage.css";

const companies = [
  {
    name: "Google",
    role: "Software Engineer Intern",
    stipend: "₹80,000/month",
    eligibility: "CGPA ≥ 8.0, good DSA skills",
    website: "https://careers.google.com",
  },
  {
    name: "Infosys",
    role: "Systems Engineer",
    stipend: "₹35,000/month",
    eligibility: "CGPA ≥ 6.5, any branch",
    website: "https://careers.infosys.com",
  },
  {
    name: "Accenture",
    role: "Associate Software Engineer",
    stipend: "₹40,000/month",
    eligibility: "CGPA ≥ 7.0, communication skills",
    website: "https://www.accenture.com/in-en/careers",
  },
];

const LibraryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="library-container">
      <header className="library-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h1>📚 Company Library</h1>
      </header>

      <div className="company-list">
        {companies.map((company, index) => (
          <div className="company-card" key={index}>
            <h2>
              <FaBuilding /> {company.name}
            </h2>
            <p>
              <FaBriefcase /> <strong>Role:</strong> {company.role}
            </p>
            <p>💰 <strong>Stipend:</strong> {company.stipend}</p>
            <p>🎯 <strong>Eligibility:</strong> {company.eligibility}</p>
            <a href={company.website} target="_blank" rel="noopener noreferrer">
              🌐 Visit Career Page
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
