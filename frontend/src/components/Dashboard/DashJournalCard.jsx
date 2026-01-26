import React from "react";

const DashJournalCard = ({ title, date, excerpt }) => (
  <div className="group p-6 rounded-xl bg-white dark:bg-[#1a2e2c] border border-gray-100 dark:border-gray-800 shadow-sm hover:border-primary/50 transition-all cursor-pointer">
    <div className="flex justify-between items-start mb-2">
      <h3 className="serif-text text-xl font-semibold text-[#0e1b19] dark:text-white group-hover:text-primary transition-colors">
        {title}
      </h3>
      <span className="text-xs font-display text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">
        {date}
      </span>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-400 font-display line-clamp-2 leading-relaxed">
      {excerpt}
    </p>
  </div>
);

export default DashJournalCard;
