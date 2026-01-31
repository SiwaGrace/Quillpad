import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeJournal } from "../../features/JournalSlice";
import {
  PiTrashLight,
  PiPencilSimpleLineLight,
  PiEyeLight,
  PiDotsThreeVerticalBold,
} from "react-icons/pi";
import toast from "react-hot-toast";

const JournalEntryCard = ({
  id,
  title,
  date,
  month,
  day,
  excerpt,
  visionLinked,
}) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = () => {
    setShowMenu(false);

    toast(
      (t) => (
        <span className="flex items-center gap-4">
          <span className="text-sm font-medium">Delete this entry?</span>
          <button
            onClick={() => {
              dispatch(removeJournal(id));
              toast.dismiss(t.id);
              toast.success("Entry removed from sanctuary.");
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-600 transition-colors"
          >
            Confirm
          </button>
        </span>
      ),
      {
        duration: 4000,
        style: {
          background: "#1a2e2a", // Matches your dark green theme
          color: "#fff",
          borderRadius: "12px",
          border: "1px solid #2a453f",
        },
      },
    );
  };

  return (
    <>
      <div className="flex  p-6 gap-4  rounded-2xl">
        <div
          className="hidden sm:flex flex-col items-center justify-start pt-1 text-slate-400"
          style={{ fontFamily: "var(--font-script)" }}
        >
          <span className="text-xs font-sans font-bold uppercase tracking-tighter">
            {month}
          </span>
          <span className="text-xl font-bold">{day}</span>
        </div>

        <div
          className="group  relative flex flex-col gap-2   transition-all  w-full"
          onMouseLeave={() => setShowMenu(false)}
        >
          {/* Header & Menu Button */}
          <div className="flex justify-between items-start">
            <Link to={`/journal/${id}`} className="flex-1">
              <h3 className="serif-text text-xl font-bold text-[#0e1b19] dark:text-white group-hover:text-primary transition-colors leading-tight">
                {title}
              </h3>
            </Link>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-400"
              >
                <PiDotsThreeVerticalBold size={24} />
              </button>

              {/* Action Dropdown */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-[#0c1817] border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl z-10 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                  <Link
                    to={`/journal/${id}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <PiPencilSimpleLineLight size={18} /> Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                  >
                    <PiTrashLight size={18} /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Date */}
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {date}
          </p>

          {/* Excerpt */}
          <Link to={`/journal/${id}`}>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3 italic font-display">
              {excerpt || "No content provided..."}
            </p>
          </Link>

          {/* Tags (The "Vision Linked" badge) */}
          <div className="flex gap-2 mt-3">
            <span className="text-[10px] font-bold uppercase px-2 py-1 bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-gray-400 rounded-md">
              category
            </span>
            {visionLinked && (
              <span className="text-[10px] font-bold uppercase px-2 py-1 bg-primary/10 text-primary rounded-md flex items-center gap-1">
                <span className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                Vision Linked
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JournalEntryCard;
