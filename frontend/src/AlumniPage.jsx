import React, { useState } from "react";
import "./AlumniPage.css";

const AlumniPage = () => {
  const [company, setCompany] = useState("");
  const [alumniList, setAlumniList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock alumni data (you can replace this with a backend API call)
  const alumniDatabase = [
    {
      name: "Ananya Sharma",
      company: "Google",
      position: "Software Engineer",
      email: "ananya.sharma@alumni.edu",
      linkedin: "https://linkedin.com/in/ananya-sharma",
      image:
        "https://cdn-icons-png.flaticon.com/512/2922/2922561.png",
    },
    {
      name: "Ravi Kumar",
      company: "Infosys",
      position: "System Engineer",
      email: "ravi.kumar@alumni.edu",
      linkedin: "https://linkedin.com/in/ravi-kumar",
      image:
        "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
    },
    {
      name: "Priya Nair",
      company: "Amazon",
      position: "Data Analyst",
      email: "priya.nair@alumni.edu",
      linkedin: "https://linkedin.com/in/priya-nair",
      image:
        "https://cdn-icons-png.flaticon.com/512/2922/2922688.png",
    },
    {
      name: "Suresh Patel",
      company: "TCS",
      position: "Cloud Architect",
      email: "suresh.patel@alumni.edu",
      linkedin: "https://linkedin.com/in/suresh-patel",
      image:
        "https://cdn-icons-png.flaticon.com/512/2922/2922656.png",
    },
    {
      name: "Anita Sharma",
company: "Infosys",
position: "Data Scientist",
email: "anita.sharma@alumni.edu",
linkedin: "https://linkedin.com/in/anita-sharma",
image: "https://cdn-icons-png.flaticon.com/512/2922/2922561.png",

    },
  ];

  const handleSearch = () => {
    if (!company.trim()) {
      alert("⚠️ Please enter a company name!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const filteredAlumni = alumniDatabase.filter(
        (alumni) =>
          alumni.company.toLowerCase() === company.toLowerCase()
      );
      setAlumniList(filteredAlumni);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="alumni-page">
      <div className="alumni-card">
        <h1>🤝 Alumni Connect</h1>
        <p className="subtitle">
          Find mentors working in your dream company and get guidance from them!
        </p>

        <div className="search-section">
          <input
            type="text"
            placeholder="Enter your interested company (e.g. Google, TCS)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="company-input"
          />
          <button onClick={handleSearch} className="search-btn">
            🔍 Search
          </button>
        </div>

        {loading && <p className="loading">⏳ Searching mentors...</p>}

        {!loading && alumniList.length > 0 && (
          <div className="alumni-results">
            <h2>🎯 Alumni in {company}</h2>
            <div className="alumni-grid">
              {alumniList.map((alumni, index) => (
                <div key={index} className="alumni-profile">
                  <img
                    src={alumni.image}
                    alt={alumni.name}
                    className="alumni-img"
                  />
                  <h3>{alumni.name}</h3>
                  <p className="alumni-company">{alumni.company}</p>
                  <p className="alumni-position">{alumni.position}</p>
                  <a
                    href={alumni.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="linkedin-btn"
                  >
                    🔗 LinkedIn
                  </a>
                  <p className="email">{alumni.email}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && alumniList.length === 0 && company && (
          <p className="no-results">😕 No alumni found for {company}.</p>
        )}
      </div>
    </div>
  );
};

export default AlumniPage;
