import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./RoleSelection";
import LoginPage from "./LoginPage";
import RegisterPage from "./Register";
import StudentDashboard from "./StudentDashboard";
import PlacementOfficerDashboard from "./PlacementOfficerDashboard";
import ChatBoltPage from "./ChatBoltPage";
import LibraryPage from "./LibraryPage";
<<<<<<< HEAD
import ProfilePage from "./ProfilePage";
=======

import CodeEditor from "./component/CodeEditor"
import { Box } from "@chakra-ui/react";

>>>>>>> 0a887bb804c32c7d2f62a4c96ccf1b421e024041


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
<<<<<<< HEAD
<Route path="/profile" element={<ProfilePage />} />
=======
<Route path="/code-editor" element={<CodeEditor/>}/>

>>>>>>> 0a887bb804c32c7d2f62a4c96ccf1b421e024041
      </Routes>
    </Router>
  );
}

export default App;
