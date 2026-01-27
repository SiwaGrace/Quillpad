import React, { useState } from "react";
import v_image from "../../assets/img/long_pcimage.jpg";
import DeleteVision from "../../components/VisionDetailComponents/DeleteVision";
// import DeleteVision from "../VisionDetailComponents/DeleteVisionNoModal";
import { Link, useNavigate, useLocation } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import CircularProgressBar from "../VisionDetailComponents/CircularProgressBar";

// --- NEW: Grid View Component ---
const VisionCardGrid = ({ visions }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {visions.map((vision) => (
        <div
          key={vision._id}
          className="group bg-white dark:bg-[#1a2e2c] rounded-xl border border-[#e8f3f2] dark:border-[#253a38] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative"
        >
          {/* === 1. IMAGE SECTION (Navigates to Detail) === */}
          <div
            className="relative h-40 w-full overflow-hidden cursor-pointer"
            onClick={() => navigate(`/visions/${vision._id}`)}
          >
            <img
              src={v_image}
              alt={vision.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Floating Badges */}
            <div className="absolute top-3 left-3 z-10">
              <StatusBadge status={vision.status} />
            </div>
            <div className="absolute top-3 right-3 z-10">
              <CircularProgressBar progress={vision.progress} />
            </div>
          </div>

          {/* === 2. DATA SECTION === */}
          <div className="p-5">
            {/* Header Area */}
            <div className="flex justify-between items-start mb-2 relative">
              <div
                className="cursor-pointer group/title pr-2 overflow-hidden"
                onClick={() => navigate(`/visions/${vision._id}`)}
              >
                <h3 className="text-xl font-bold text-[#0e1b19] dark:text-white truncate group-hover/title:text-[#50958f] transition-colors capitalize">
                  {vision.title}
                </h3>
                <p className="text-xs font-medium text-[#50958f] uppercase tracking-wider">
                  {vision.category || "Uncategorized"}
                </p>
              </div>

              {/* Action Menu (...) */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenu(
                      activeMenu === vision._id ? null : vision._id,
                    );
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-[#0e1b19] text-[#50958f] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    more_horiz
                  </span>
                </button>

                {activeMenu === vision._id && (
                  <>
                    {/* Invisible backdrop to close menu */}
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setActiveMenu(null)}
                    ></div>

                    <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-[#0e1b19] rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 z-30 py-1 animate-in fade-in zoom-in-95 duration-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/visions/${vision._id}/edit`);
                        }}
                        className="w-full px-4 py-2.5 text-sm font-semibold text-[#0e1b19] dark:text-gray-200 hover:bg-[#f0f5f5] dark:hover:bg-[#1a2e2c] flex items-center gap-3 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          edit
                        </span>
                        Edit Vision
                      </button>
                      <div
                        className="w-full px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-3 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DeleteVision vision={vision} redirectOnDelete={false}>
                          {/* This is the 'children' part. It looks like a normal menu item now! */}
                          <div className="flex items-center gap-3 w-full text-red-500 hover:bg-red-50  px-4 transition-colors">
                            <span className="material-symbols-outlined text-[18px]">
                              delete
                            </span>
                            <span className="font-semibold">Delete</span>
                          </div>
                        </DeleteVision>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Progress Bar (The aesthetic one) */}
            <div className="mt-4 mb-4">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Growth
                </span>
                <span className="text-[10px] font-bold text-[#50958f]">
                  {vision.progress}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#e8f3f2] dark:bg-[#0e1b19] rounded-full overflow-hidden">
                <div
                  className="bg-[#4ce6d9] h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${vision.progress}%` }}
                />
              </div>
            </div>

            {/* Footer Stats */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-50 dark:border-gray-800 text-[11px] font-bold text-[#50958f] uppercase tracking-tighter">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">
                  account_tree
                </span>
                <span className="font-black text-xl">
                  {vision.subVisions.length}
                </span>{" "}
                Steps
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">
                  calendar_today
                </span>
                {new Date(vision.targetDate).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* <!-- Card 4 (Empty/Add state style) --> */}
      <Link
        to="/createvision"
        state={{ from: location.pathname }}
        className="flex flex-col items-center justify-center min-h-[380px] bg-transparent border-2 border-dashed border-[#50958f]/30 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all group cursor-pointer"
      >
        <div className="w-12 h-12 rounded-full bg-[#e8f3f2] dark:bg-[#1a2e2c] flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-background-dark transition-colors">
          <span className="material-symbols-outlined">add_circle</span>
        </div>
        <span className="text-lg font-bold text-[#50958f] group-hover:text-primary">
          Create New Vision
        </span>
        <p className="text-xs text-[#50958f]/70 mt-1">
          Start your next chapter today
        </p>
      </Link>
    </div>
  );
};

export default VisionCardGrid;
