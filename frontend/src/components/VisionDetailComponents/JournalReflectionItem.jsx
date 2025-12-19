import React from "react";
import { Link } from "react-router-dom";

const JournalReflectionItem = ({ journal }) => {
  return (
    <Link to={`/journal/${journal._id}`} className="block cursor-pointer">
      <div className="flex justify-between items-center p-3 hover:bg-teal-50 transition border-b border-gray-300">
        <p className="font-medium text-gray-700 truncate">{journal.title}</p>
        <span className="text-green-500 text-xs font-semibold">
          {journal.date
            ? new Date(journal.date).toLocaleDateString()
            : "No date"}
        </span>
      </div>
    </Link>
  );
};

export default JournalReflectionItem;
