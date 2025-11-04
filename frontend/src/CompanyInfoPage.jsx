import React, { useState } from "react";
import "./CompanyInfoPage.css";

const CompanyInfoPage = () => {
  const [companies] = useState([
    { name: "Tata Consultancy Services (TCS)", date: "Nov 20, 2025", role: "Software Engineer", package: "₹7 LPA" },
    { name: "Infosys", date: "Dec 1, 2025", role: "System Analyst", package: "₹6 LPA" },
    { name: "Accenture", date: "Dec 10, 2025", role: "Associate Developer", package: "₹6.5 LPA" },
    { name: "Amazon", date: "Jan 5, 2026", role: "SDE Intern", package: "₹10 LPA" },
  ]);

  const handleNotifyStudents = (companyName) => {
    alert(`📢 Notification sent to students about ${companyName}!`);
  };

  return (
    <div className="company-page">
      <header className="company-header">
        <h1>🏢 Upcoming Company Drives</h1>
        <p>Stay informed about upcoming placement opportunities and notify students easily.</p>
      </header>

      <div className="company-list">
        {companies.map((company, index) => (
          <div key={index} className="company-card">
            <h2>{company.name}</h2>
            <p><strong>Date:</strong> {company.date}</p>
            <p><strong>Role:</strong> {company.role}</p>
            <p><strong>Package:</strong> {company.package}</p>
            <button
              className="notify-btn"
              onClick={() => handleNotifyStudents(company.name)}
            >
              🚀 Notify Students
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyInfoPage;
