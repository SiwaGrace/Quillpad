import React from "react";
import { Link } from "react-router-dom";

const JournalReflectionItem = ({ id, title, status }) => {
  return (
    <Link
      to={`/journal/${id}`} // use the actual ID
      className="flex justify-between items-center p-3 hover:bg-teal-50 transition border-b border-gray-300"
    >
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0"></div>
        <p className="font-medium text-gray-700 truncate">{title}</p>
      </div>
      {status && (
        <span className="text-green-500 text-xs font-semibold">
          ✓ Seen {status}
        </span>
      )}
    </Link>
  );
};

export default JournalReflectionItem;
