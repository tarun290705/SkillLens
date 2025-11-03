import React from "react";
import { motion as Motion } from "framer-motion";

const SuccessPopup = ({ role }) => {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-xl shadow-lg"
    >
      <p className="font-semibold">
        Logged in successfully as {role}
        {role === "student" ? "Student 🎓" : "Placement Officer 🧑‍💼"}
      </p>
    </Motion.div>
  );
};

export default SuccessPopup;
