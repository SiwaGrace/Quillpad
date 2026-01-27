import React from "react";
import { Link, useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const VisionListView = ({ filteredVisions }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white dark:bg-[#0e1b19] border border-slate-200 dark:border-slate-800 rounded-xl overflow-auto shadow-sm no-scrollbar">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Vision Title
            </th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-48">
              Progress
            </th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Target Date
            </th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
              Trend
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredVisions.map((vision) => (
            <tr
              key={vision._id}
              onClick={() => navigate(`/visions/${vision._id}`)}
              className="group hover:bg-primary/5 dark:hover:bg-primary/5 transition-colors cursor-pointer"
            >
              {/* 1. Vision Title with Icon */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded bg-primary/10 flex items-center justify-center text-primary-400">
                    <span className="material-symbols-outlined text-lg">
                      {vision.category === "Career"
                        ? "rocket_launch"
                        : "psychology"}
                    </span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px]">
                    {vision.title}
                  </span>
                </div>
              </td>

              {/* 2. Category Pill */}
              <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400">
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded-full uppercase tracking-tight">
                  {vision.category}
                </span>
              </td>

              {/* 3. Linear Progress Bar */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-400 rounded-full transition-all duration-500"
                      style={{ width: `${vision.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    {vision.progress}%
                  </span>
                </div>
              </td>

              {/* 4. Target Date */}
              <td className="px-6 py-5 text-sm text-slate-500 dark:text-slate-400 italic">
                {vision.targetDate
                  ? new Date(vision.targetDate).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })
                  : "No date"}
              </td>

              {/* 5. SVG Trend Sparkline */}
              <td className="px-6 py-5 text-right">
                <div className="inline-flex items-center text-primary-400/40 group-hover:text-primary-400 transition-colors">
                  <svg
                    className="stroke-current"
                    fill="none"
                    height="20"
                    viewBox="0 0 60 24"
                    width="50"
                  >
                    <path
                      d="M2 18 L10 14 L20 16 L30 8 L40 10 L50 2 L58 4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisionListView;
