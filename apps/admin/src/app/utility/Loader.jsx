import React from "react";
import "../globals.css";
const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-beat"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-beat delay-200"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-beat delay-400"></div>
      </div>
    </div>
  );
};

export default Loader;
