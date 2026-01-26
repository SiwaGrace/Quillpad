import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJournals } from "../../features/JournalSlice";
import DashJournalCard from "./DashJournalCard";
import { MdArrowForward, MdHistoryEdu } from "react-icons/md";

const JournalsDataEntries = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Optimized selection from your robust slice
  const { entries, status, error } = useSelector((state) => state.journal);

  useEffect(() => {
    // Only fetch when the app starts or if the state was reset to idle
    if (status === "idle") {
      dispatch(fetchJournals());
    }
  }, [dispatch, status]);

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-xl font-bold tracking-tight text-[#0e1b19] dark:text-white">
          Recent Journals
        </h2>
        <button
          onClick={() => navigate("/journal")}
          className="text-sm text-gray-500 hover:text-primary flex items-center gap-1 transition-colors cursor-pointer"
        >
          View all <MdArrowForward />
        </button>
      </div>

      {/* 1. LOADING STATE */}
      {status === "loading" && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-28 w-full bg-gray-100 dark:bg-gray-800/50 animate-pulse rounded-xl border border-gray-100 dark:border-gray-800"
            />
          ))}
        </div>
      )}

      {/* 2. ERROR STATE */}
      {status === "failed" && (
        <div className="p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-900/20">
          <p className="font-medium">Failed to load journals</p>
          <p className="opacity-80">{error}</p>
        </div>
      )}

      {/* 3. SUCCESS STATE (Empty) */}
      {status === "succeeded" && entries.length === 0 && (
        <div className="p-10 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
          <MdHistoryEdu className="mx-auto text-gray-300 dark:text-gray-700 text-4xl mb-2" />
          <p className="text-gray-500 dark:text-gray-400">
            No entries found. Your journey is waiting to be written.
          </p>
        </div>
      )}

      {/* 4. SUCCESS STATE (With Data) */}
      <div className="space-y-4">
        {status === "succeeded" &&
          entries.length > 0 &&
          entries.slice(0, 3).map((entry) => (
            <Link
              key={entry._id}
              to={`/journal/${entry._id}`}
              className="block group"
            >
              <DashJournalCard
                title={entry.title}
                date={new Date(entry.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                // Robust content cleaning for the excerpt
                excerpt={
                  entry.content?.replace(/<[^>]*>/g, "").length > 140
                    ? entry.content.replace(/<[^>]*>/g, "").slice(0, 140) +
                      "..."
                    : entry.content?.replace(/<[^>]*>/g, "") ||
                      "Start writing your thoughts..."
                }
              />
            </Link>
          ))}
      </div>
    </section>
  );
};

export default JournalsDataEntries;
