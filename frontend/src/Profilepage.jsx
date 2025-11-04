import React, { useState, useEffect } from "react";
import { FaSave, FaUserEdit, FaArrowLeft, FaUserGraduate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "./api/axios"; // Axios instance
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
    dream_company: "", 
  });

  // Fetch existing profile when component loads
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await API.get("profile/");
      setFormData(res.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("No existing profile, please fill out the form.");
      } else {
        console.error("Error fetching profile:", error);
      }
    }
  };
  fetchProfile();
}, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save or update profile
  const handleSaveOrUpdate = async () => {
  try {
    const res = await API.post("profile/", formData);
    alert("✅ Profile saved successfully!");
  } catch (error) {
    console.error("Error saving profile:", error.response?.data || error);
  }
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

      <h2 className="profile-heading">🎓 Profile ✨</h2>

      {/* Profile Form */}
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
                  name="dream_company"
                  value={formData.dream_company}
                  onChange={handleChange}
                  placeholder="Enter dream company name"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="btn-container">
            <button
              type="button"
              className="save-btn"
              onClick={handleSaveOrUpdate}
            >
              <FaSave /> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
