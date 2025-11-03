import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./RoleSelection";
import LoginPage from "./LoginPage";
import RegisterPage from "./Register";
import StudentDashboard from "./StudentDashboard";
import PlacementOfficerDashboard from "./PlacementOfficerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/placement-dashboard" element={<PlacementOfficerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
