import React from "react";
import { motion } from "framer-motion";

const SuccessPopup = ({ role }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-xl shadow-lg"
    >
      <p className="font-semibold">
        Logged in successfully as{" "}
        {role === "student" ? "Student 🎓" : "Placement Officer 🧑‍💼"}
      </p>
    </motion.div>
  );
};

export default SuccessPopup;
