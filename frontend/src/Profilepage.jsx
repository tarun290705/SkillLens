import React, { useState } from "react";
import { FaSave, FaUserEdit, FaArrowLeft, FaUserGraduate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();
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
    dreamCompany: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("✅ Profile Saved Successfully!");
  };

  const handleUpdate = () => {
    alert("🔄 Profile Updated Successfully!");
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <header className="profile-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h1>
          <FaUserGraduate className="icon" /> Student Profile
        </h1>
      </header>

      {/* Profile Heading */}
      <h2 className="profile-heading">🎓 Profile ✨</h2>

      {/* Profile Card */}
      <div className="profile-card">
        <form className="profile-form">
          <div className="form-columns">
            {/* Column 1 */}
            <div className="form-column">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Contact</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                />
              </div>

              <div className="form-group">
                <label>CGPA</label>
                <input
                  type="text"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
                  placeholder="Enter your CGPA"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="form-column">
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Enter your department"
                />
              </div>

              <div className="form-group">
                <label>Year</label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="Enter current year"
                />
              </div>

              <div className="form-group">
                <label>Semester</label>
                <input
                  type="text"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  placeholder="Enter current semester"
                />
              </div>

              <div className="form-group">
                <label>Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Enter your skills"
                />
              </div>

              <div className="form-group">
                <label>LinkedIn</label>
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="Enter LinkedIn URL"
                />
              </div>

              <div className="form-group">
                <label>GitHub</label>
                <input
                  type="text"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="Enter GitHub URL"
                />
              </div>

              <div className="form-group">
                <label>Dream Company</label>
                <input
                  type="text"
                  name="dreamCompany"
                  value={formData.dreamCompany}
                  onChange={handleChange}
                  placeholder="Enter dream company name"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="btn-container">
            <button type="button" className="save-btn" onClick={handleSave}>
              <FaSave /> Save
            </button>
            <button type="button" className="update-btn" onClick={handleUpdate}>
              <FaUserEdit /> Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
