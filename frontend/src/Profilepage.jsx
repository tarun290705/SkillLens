import React, { useState } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    contact: "",
    address: "",
    cgpa: "",
    department: "",
    year: "",
    semester: "",
    skills: "",
    linkedin: "",
    github: "",
    dreamCompany: "", // Added new field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile saved successfully! ✅");
    console.log(formData);
  };

  return (
    <div className="profile-container">
      <h1 className="profile-heading">🎓 Student Profile</h1>

      <form className="profile-form" onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contact</label>
          <input
            type="tel"
            name="contact"
            placeholder="Enter contact number"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {/* Academic Info */}
        <div className="form-group">
          <label>CGPA</label>
          <input
            type="number"
            name="cgpa"
            step="0.01"
            placeholder="e.g. 8.5"
            value={formData.cgpa}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            placeholder="Enter your department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Year</label>
          <input
            type="text"
            name="year"
            placeholder="e.g. 3rd Year"
            value={formData.year}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Semester</label>
          <input
            type="text"
            name="semester"
            placeholder="e.g. 6th Semester"
            value={formData.semester}
            onChange={handleChange}
          />
        </div>

        {/* Skills and Links */}
        <div className="form-group">
          <label>Skills</label>
          <textarea
            name="skills"
            placeholder="List your technical and soft skills"
            value={formData.skills}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>LinkedIn</label>
          <input
            type="url"
            name="linkedin"
            placeholder="LinkedIn profile URL"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>GitHub</label>
          <input
            type="url"
            name="github"
            placeholder="GitHub profile URL"
            value={formData.github}
            onChange={handleChange}
          />
        </div>

        {/* Dream Company */}
        <div className="form-group">
          <label>Dream Company</label>
          <input
            type="text"
            name="dreamCompany"
            placeholder="Enter your dream company (e.g. Google, Infosys)"
            value={formData.dreamCompany}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="save-btn">
          💾 Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
