// src/components/VisionDetailComponents/CircularProgressBar.js
import React from "react";

const CircularProgressBar = ({ progress, size = 60 }) => {
  const radius = size / 2 - 5;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const strokeColor = progress === 100 ? "text-green-600" : "text-teal-600";

  // tailwind custom color style
  const bgColor = "text-success-500";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="w-full h-full transform -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth="5"
          fill="none"
          className="text-gray-200"
          stroke="currentColor"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth="5"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${strokeColor} transition-all duration-500`}
          stroke="currentColor"
        />
      </svg>

      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-500">
        {progress}%
      </span>
    </div>
  );
};

export default CircularProgressBar;
