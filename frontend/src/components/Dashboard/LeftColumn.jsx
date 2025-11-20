import React from "react";
import { Link } from "react-router-dom";

const LeftColumn = ({
  logoLeaf,
  recentEntries,
  progressImages,
  progressPercent,
}) => {
  return (
    <div className="space-y-6">
      {/* Capture Vision */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <Link to="/createvision">
          <button className="bg-linear-to-b from-sky-300 to-sky-400 text-white font-semibold px-6 py-2 rounded-full shadow hover:opacity-90 transition flex items-center justify-between cursor-pointer">
            {" "}
            <img src={logoLeaf} alt="logo" className="h-10" />
            <p>Capture Vision</p>
          </button>
        </Link>
      </div>

      {/* Recent Entries */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="font-semibold text-gray-700 mb-4">Recent Entries</h2>
        {recentEntries.map((entry, index) => (
          <div key={index} className="flex items-center space-x-4 mb-4">
            <img
              src={entry.image}
              alt={entry.title}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div>
              <p className="font-semibold">{entry.title}</p>
              <p className="text-sm text-gray-500">{entry.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Vision Board Progress */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="font-semibold text-gray-700 mb-4">
          Vision Board Progress
        </h2>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full border-4 border-sky-400 flex items-center justify-center font-semibold text-sky-500">
            {progressPercent}%
          </div>
          <div className="flex space-x-2">
            {progressImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`progress-${idx}`}
                className="w-14 h-14 rounded-lg object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftColumn;
