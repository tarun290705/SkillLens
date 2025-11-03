import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./RoleSelection";
import LoginPage from "./LoginPage";
import RegisterPage from "./Register";
import StudentDashboard from "./StudentDashboard";
import PlacementOfficerDashboard from "./PlacementOfficerDashboard";import ChatBoltPage from "./ChatBoltPage";
import LibraryPage from "./LibraryPage";






function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/placement-dashboard" element={<PlacementOfficerDashboard />} />
         <Route path="/dashboard" element={<StudentDashboard />} />
  <Route path="/chatbolt" element={<ChatBoltPage />} />
<Route path="/library" element={<LibraryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
