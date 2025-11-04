import React from "react";
import { useNavigate } from "react-router-dom";
import "./UpskillingPage.css";

const UpskillingPage = () => {
  const navigate = useNavigate();

  const technologies = [
    {
      name: "Artificial Intelligence (AI) & Machine Learning",
      desc: "AI is powering automation, data-driven decisions, and intelligent systems across industries.",
      links: [
        { title: "Google AI Course", url: "https://ai.google/education/" },
        { title: "Coursera: Machine Learning by Andrew Ng", url: "https://www.coursera.org/learn/machine-learning" },
        { title: "Fast.ai Practical Deep Learning", url: "https://course.fast.ai/" },
      ],
    },
    {
      name: "Cloud Computing",
      desc: "Platforms like AWS, Azure, and Google Cloud dominate the tech landscape, enabling scalable solutions.",
      links: [
        { title: "AWS Cloud Practitioner Essentials", url: "https://www.aws.training/Details/Curriculum?id=20685" },
        { title: "Microsoft Azure Fundamentals", url: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/" },
        { title: "Google Cloud Training", url: "https://cloud.google.com/training" },
      ],
    },
    {
      name: "Cybersecurity",
      desc: "With the rise in digital transformation, securing systems and networks is more critical than ever.",
      links: [
        { title: "Google Cybersecurity Professional Certificate", url: "https://www.coursera.org/professional-certificates/google-cybersecurity" },
        { title: "IBM Cybersecurity Analyst Program", url: "https://www.coursera.org/professional-certificates/ibm-cybersecurity-analyst" },
        { title: "TryHackMe Labs", url: "https://tryhackme.com/" },
      ],
    },
    {
      name: "Blockchain",
      desc: "Beyond cryptocurrency, blockchain is revolutionizing data security, contracts, and identity management.",
      links: [
        { title: "Blockchain Basics (Coursera)", url: "https://www.coursera.org/learn/blockchain-basics" },
        { title: "Ethereum Developer Bootcamp", url: "https://ethereum.org/en/developers/tutorials/" },
        { title: "IBM Blockchain Foundation Developer", url: "https://developer.ibm.com/series/blockchain-fundamentals/" },
      ],
    },
    {
      name: "Internet of Things (IoT)",
      desc: "Smart devices are connecting the physical and digital worlds for efficiency and convenience.",
      links: [
        { title: "Introduction to IoT (Cisco)", url: "https://www.netacad.com/courses/iot/introduction-iot" },
        { title: "IoT Specialization (Coursera)", url: "https://www.coursera.org/specializations/internet-of-things" },
        { title: "IoT for Beginners (Microsoft)", url: "https://github.com/microsoft/IoT-For-Beginners" },
      ],
    },
    {
      name: "Generative AI & LLMs",
      desc: "Tools like ChatGPT and Gemini are transforming content creation, coding, and productivity.",
      links: [
        { title: "DeepLearning.AI Generative AI Short Courses", url: "https://www.deeplearning.ai/short-courses/" },
        { title: "OpenAI Learning Resources", url: "https://platform.openai.com/docs/overview" },
        { title: "Google Cloud Generative AI Learning Path", url: "https://cloud.google.com/learn/paths/generative-ai" },
      ],
    },
  ];

  return (
    <div className="upskilling-container">
      <header className="upskilling-header">
        <h1>🌟 Upskilling Insights</h1>
        <p>
          Stay ahead with the latest technologies shaping the future of work and innovation.
        </p>
      </header>

      {/* 💡 Technologies Section */}
      <section className="technologies-section">
        <h2 className="section-title">🚀 Technologies</h2>
        <div className="tech-grid">
          {technologies.map((tech, index) => (
            <div key={index} className="tech-card">
              <h3>{tech.name}</h3>
              <p>{tech.desc}</p>
              <ul className="course-links">
                {tech.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      🔗 {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default UpskillingPage;
