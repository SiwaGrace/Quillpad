import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  fetchSubVisionById,
  updateSubVisionById,
} from "../../features/SubVisionSlice";
import { fetchJournals } from "../../features/JournalSlice";
import { fetchVisionById } from "../../features/VisionSlice";
import toast from "react-hot-toast";

const SubVisionDetail = () => {
  const { id: visionId, subId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { entries: journals } = useSelector((state) => state.journal);
  const [status, setStatus] = React.useState("");

  const {
    selected: subVision,
    loading,
    error,
  } = useSelector((state) => state.subvisions);

  useEffect(() => {
    dispatch(fetchSubVisionById({ visionId, subId }));
    dispatch(fetchJournals({ subVisionId: subId }));
  }, [dispatch, visionId, subId]);

  useEffect(() => {
    if (subVision) setStatus(subVision.status);
  }, [subVision]);

  const handleStatusUpdate = async (newStatus) => {
    setStatus(newStatus);
    try {
      await dispatch(
        updateSubVisionById({ visionId, subId, data: { status: newStatus } }),
      ).unwrap();
      dispatch(fetchVisionById(visionId));
      toast.success(`Milestone marked as ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  if (loading)
    return (
      <div className="max-w-4xl mx-auto mt-20 p-8 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl h-64" />
    );
  if (!subVision)
    return (
      <p className="text-center mt-20 text-slate-500">Milestone not found.</p>
    );

  const subVisionJournals = journals.filter(
    (j) => j.subVisionId?._id === subId,
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Top Navigation */}
      <button
        onClick={() => navigate(`/visions/${visionId}`)}
        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary-400 transition-colors mb-6"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Back to Vision
      </button>

      <div className="bg-white dark:bg-[#142d2a] rounded-3xl border border-slate-200 dark:border-[#1a3b38] overflow-hidden shadow-xl shadow-primary-400/5">
        {/* Header Section */}
        <div className="p-8 border-b border-slate-100 dark:border-[#1a3b38] bg-slate-50/50 dark:bg-slate-800/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {subVision.title}
              </h1>
              <div className="mt-6 relative">
                {/* Decorative quote mark for a premium feel */}
                <span className="absolute -left-4 -top-2 text-6xl text-primary-400/10 font-serif pointer-events-none">
                  “
                </span>

                <p className="text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-300 font-medium italic border-l-4 border-primary-400/20 pl-6 py-1">
                  {subVision.description ||
                    "No description provided for this milestone."}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="h-px w-8 bg-primary-400/30"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-400/60">
                    Mission Directive
                  </span>
                </div>
              </div>
            </div>
            <Link
              to="/journal/new"
              state={{
                redirectTo: `/visions/${visionId}/subvision/${subId}`,
                visionId,
                subVisionId: subId,
              }}
              className="flex items-center gap-2 bg-primary-400 text-slate-900 px-6 py-3 rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary-400/20"
            >
              <span className="material-symbols-outlined text-lg">
                edit_note
              </span>
              Record Reflection
            </Link>
          </div>

          {/* Progress & Status Toggles */}
          <div className="mt-8 flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <div className="flex justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary-400">
                  Current Progress
                </span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {subVision.progress}%
                </span>
              </div>
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-400 rounded-full transition-all duration-1000"
                  style={{ width: `${subVision.progress}%` }}
                />
              </div>
            </div>

            <div className="flex bg-slate-100 dark:bg-[#0e1b19] p-1 rounded-xl w-full md:w-auto">
              {["not started", "in progress", "completed"].map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusUpdate(s)}
                  className={`flex-1 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${
                    status === s
                      ? "bg-white dark:bg-primary-400 text-primary-400 dark:text-slate-900 shadow-sm"
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Journal Section */}
        <div className="p-8">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">history</span>
            Reflection Timeline ({subVisionJournals.length})
          </h2>

          <div className="space-y-4">
            {subVisionJournals.length > 0 ? (
              subVisionJournals.map((j) => (
                <div
                  key={j._id}
                  className="group relative pl-6 border-l-2 border-slate-100 dark:border-[#1a3b38] hover:border-primary-400 transition-colors pb-6"
                >
                  <div className="absolute -left-[9px] top-0 size-4 rounded-full bg-white dark:bg-[#142d2a] border-2 border-slate-200 dark:border-[#1a3b38] group-hover:border-primary-400 transition-colors" />
                  <div className="bg-slate-50 dark:bg-[#0e1b19]/40 p-5 rounded-2xl border border-transparent hover:border-primary-400/20 transition-all">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">
                        {j.title}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400">
                        {new Date(j.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                      {j.content}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-slate-100 dark:border-[#1a3b38] rounded-3xl">
                <span className="material-symbols-outlined text-4xl text-slate-200 mb-2">
                  auto_stories
                </span>
                <p className="text-sm text-slate-400 italic">
                  No reflections recorded yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubVisionDetail;
