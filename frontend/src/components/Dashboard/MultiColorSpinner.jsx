import React from "react";

const MultiColorSpinner = ({ size = 16, message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex flex-col w-full items-center justify-center bg-indigo-50">
      <div className="flex flex-col items-center space-y-4">
        <div
          className="rounded-full animate-spin"
          style={{
            width: `${size}rem`,
            height: `${size}rem`,
            border: `${size / 4}px solid transparent`,
            borderTopColor: "#6366f1", // Indigo
            borderRightColor: "#f472b6", // Pink
            borderBottomColor: "#34d399", // Green
            borderLeftColor: "#fbbf24", // Yellow
          }}
        ></div>
        <p className="text-indigo-600 text-lg font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default MultiColorSpinner;
