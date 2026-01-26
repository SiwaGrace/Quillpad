import React from "react";

const DashVisionCard = ({ icon, title, subtitle, description, progress }) => (
  <div className="p-6 rounded-xl bg-white dark:bg-[#1a2e2c] border border-gray-100 dark:border-gray-800 shadow-sm">
    <div className="flex items-center gap-3 mb-4">
      <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-[#0e1b19] dark:text-white text-2xl capitalize">
          {title}
        </h3>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
      {description}
    </p>
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-gray-500">Progress</span>
        <span className="text-primary-500">{progress}%</span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-primary-400 h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  </div>
);

export default DashVisionCard;
