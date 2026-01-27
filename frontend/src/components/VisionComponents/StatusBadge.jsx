import React from "react";

const StatusBadge = ({ status }) => {
  const baseStyle = "px-3 py-1 text-xs font-semibold rounded-full";
  switch (status) {
    case "completed":
      return (
        <span className={`${baseStyle} bg-green-100 text-green-800`}>
          Completed
        </span>
      );
    case "in progress":
      return (
        <span className={`${baseStyle} bg-yellow-100 text-yellow-800`}>
          In Progress
        </span>
      );
    case "not started":
    default:
      return (
        <span className={`${baseStyle} bg-gray-100 text-gray-800`}>
          Not Started
        </span>
      );
  }
};

export default StatusBadge;
