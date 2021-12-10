import React from "react";

const AnimateBlock = () => {
  return (
    <li className="animate-pulse flex space-x-4">
      <span className="flex-1 space-y-2 py-1">
        <div className="h-5 bg-gray-100 rounded"></div>
        <div className="h-5 bg-gray-100 rounded"></div>
        <div className="h-5 bg-gray-100 rounded"></div>
        <div className="h-5 bg-gray-100 rounded"></div>
        <div className="h-5 bg-gray-100 rounded"></div>
        <div className="h-5 bg-gray-100 rounded"></div>
      </span>
    </li>
  );
};

export default AnimateBlock;
