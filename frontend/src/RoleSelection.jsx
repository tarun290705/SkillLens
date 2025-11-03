import React from "react";

const RoleSelection = ({ onSelectRole }) => {
  return (
    <div className="text-center bg-white shadow-2xl rounded-2xl p-10 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Welcome to Placement Portal</h1>
      <p className="text-gray-600 mb-8">Choose your role to continue:</p>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => onSelectRole("student")}
          className="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-all"
        >
          Student Login
        </button>
        <button
          onClick={() => onSelectRole("officer")}
          className="bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600 transition-all"
        >
          Placement Officer Login
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
