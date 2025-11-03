import React, { useState } from "react";
import "./Dashboard.css";

const PlacementOfficerDashboard = () => {
  const [department, setDepartment] = useState("All Departments");

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  return (
    <div className="dashboard-container dark-mode">
      {/* Toolbar */}
      <header className="toolbar">
        <h1 className="brand-name">SkillLens</h1>

        <div className="toolbar-right">
          {/* Department Dropdown */}
          <div className="dropdown">
            <label htmlFor="department" className="dropdown-label">
              Department:
            </label>
            <select
              id="department"
              value={department}
              onChange={handleDepartmentChange}
              className="dropdown-select"
            >
              <option>All Departments</option>
              <option>Computer Science</option>
              <option>Electronics</option>
              <option>Mechanical</option>
              <option>Civil</option>
              <option>Information Science</option>
            </select>
          </div>

          {/* Notification Button */}
          <button className="notification-btn" title="Notifications">
            🔔
            <span className="notification-badge">3</span>
          </button>
        </div>
      </header>

      {/* Dashboard Body */}
      <main className="dashboard-body">
        <section className="dashboard-header">
          <h2>Placement Officer Dashboard</h2>
          <p>
            Track placement updates, manage student data, and oversee department progress.
          </p>
        </section>

        <section className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Student Analytics</h3>
            <p>Get insights on placement readiness and training progress.</p>
            <button>View Analytics</button>
          </div>

          <div className="dashboard-card">
            <h3>Company Insights</h3>
            <p>Check upcoming drives and detailed company requirements.</p>
            <button>View Companies</button>
          </div>

          <div className="dashboard-card">
            <h3>Placement Reports</h3>
            <p>Generate and export reports for each department.</p>
            <button>Generate Report</button>
          </div>

          <div className="dashboard-card">
            <h3>Student Records</h3>
            <p>Access and update student placement data.</p>
            <button>Manage Records</button>
          </div>

          <div className="dashboard-card">
            <h3>Notifications</h3>
            <p>View and send important updates to students.</p>
            <button>View Notifications</button>
          </div>

          <div className="dashboard-card">
            <h3>Drive Calendar</h3>
            <p>Track and schedule company visits and interviews.</p>
            <button>Open Calendar</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PlacementOfficerDashboard;
