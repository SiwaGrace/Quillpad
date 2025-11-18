import React from "react";

const SplashScreen = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinning circle */}
        <div className="w-[350px] h-[350px] border-5 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>

        {/* Optional message */}
        <p className="text-indigo-600 text-lg font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default SplashScreen;
