import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchVisions } from "../../features/VisionSlice";
import { fetchJournals } from "../../features/JournalSlice";
import DeleteVision from "../VisionDetailComponents/DeleteVision";
import SubvisonList from "../SubVision/SubvisonList";
import JournalReflectionItem from "../VisionDetailComponents/JournalReflectionItem";

const VisionDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: visionId } = useParams();

  const {
    items: visions,
    loading,
    error,
  } = useSelector((state) => state.visions);
  const { entries: journals } = useSelector((state) => state.journal);
  const vision = visions.find((v) => v._id === visionId);

  useEffect(() => {
    if (visionId && !vision && !loading) {
      dispatch(fetchVisions());
    }
    dispatch(fetchJournals({ visionId }));
  }, [dispatch, visionId, vision, loading]);

  if (loading && !vision)
    return (
      <div className="p-8 text-center text-primary-400 animate-pulse">
        Loading vision dashboard...
      </div>
    );
  if (!vision)
    return (
      <div className="p-8 text-center text-gray-500">Vision not found.</div>
    );

  const visionJournals = journals.filter((j) => j.visionId?._id === visionId);

  return (
    <main className="flex-1 overflow-y-auto custom-scrollbar  dark:bg-[#0e1b19] transition-colors duration-300">
      {/* === TOP HEADER & BREADCRUMBS === */}
      <div className="max-w-[1200px] mx-auto  pt-8 pb-4">
        <div className="flex  items-center gap-2 mb-4">
          <Link
            to="/vision"
            className="text-[#479e97] text-sm font-medium hover:underline"
          >
            Visions
          </Link>
          <span className="text-[#479e97] text-sm">/</span>
          <span className="text-[#0d1c1b] dark:text-slate-200 text-sm font-medium opacity-60">
            {vision.title}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-primary-400/10 text-primary-400 text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">
              {vision.category || "General"}
            </span>
            <h1 className="font-serif text-[#0d1c1b] dark:text-white text-4xl md:text-5xl font-bold tracking-tight capitalize">
              {vision.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/visions/${vision._id}/edit`)}
              className="flex items-center gap-2 bg-primary-400 hover:bg-primary-400/90 text-white px-5 py-1.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary-400/20 whitespace-nowrap min-w-fit"
            >
              <span className="material-symbols-outlined ">edit</span>
              <span>Edit Vision</span>
            </button>

            <DeleteVision vision={vision} redirectOnDelete={true}>
              <button className="px-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </DeleteVision>
          </div>
        </div>
      </div>

      {/* === MAIN DASHBOARD GRID === */}
      <div className="max-w-[1200px] mx-auto  grid grid-cols-12 gap-6 md:gap-8 py-8">
        {/* LEFT COLUMN: Sub-Visions (Milestones) */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 order-1 ">
          <div className="bg-gradient-to-br from-primary-400/10 to-transparent p-5 rounded-2xl border border-primary-400/10">
            <p className="text-xs font-bold text-primary-400 uppercase tracking-wider mb-2">
              Description
            </p>
            <p className="text-sm font-medium text-[#0d1c1b] dark:text-slate-300 leading-relaxed italic">
              "{vision.description || "Set your focus for this journey..."}"
            </p>
          </div>

          <div className="bg-white dark:bg-[#142d2a] p-5 rounded-2xl border border-[#e6f4f3] dark:border-[#1a3b38] shadow-sm">
            {/* We pass the logic into your existing SubvisionList component */}
            <SubvisonList vision={vision} />
          </div>
        </div>

        {/* CENTER COLUMN: Journal Feed */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6 order-2 lg:order-2">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold dark:text-white">
              Linked Journal
            </h2>
            <Link
              to="/journal/new"
              state={{ redirectTo: `/visions/${visionId}`, visionId }}
              className="flex items-center gap-2 bg-white dark:bg-[#142d2a] border border-primary-400/30 text-primary-400 px-4 py-2 rounded-xl font-bold text-sm hover:bg-primary-400 hover:text-white transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>New Entry</span>
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {visionJournals.length > 0 ? (
              visionJournals.map((j) => (
                <JournalReflectionItem key={j._id} journal={j} />
              ))
            ) : (
              <div className="bg-dashed border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-400">
                No entries linked to this vision yet.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Stats & Insights */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 order-3">
          <div className="bg-white dark:bg-[#142d2a] p-6 rounded-2xl border border-[#e6f4f3] dark:border-[#1a3b38] shadow-sm">
            <h2 className="text-[#0d1c1b] dark:text-white text-lg font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-400">
                bar_chart
              </span>
              Vision Stats
            </h2>

            <div className="flex flex-col gap-8">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs font-bold text-[#479e97] uppercase mb-1">
                    Progress
                  </p>
                  <p className="text-3xl font-black text-[#0d1c1b] dark:text-white">
                    {vision.progress}%
                  </p>
                </div>
                <div className="mb-1 text-primary-400">
                  <span className="material-symbols-outlined font-bold">
                    trending_up
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xs font-bold text-[#479e97] uppercase">
                    Clarity Score
                  </p>
                  <span className="text-lg font-black text-primary-400">
                    85%
                  </span>
                </div>

                {/* Visual Sparkline */}
                <div className="h-16 w-full relative overflow-hidden rounded-xl bg-primary-400/5">
                  <svg className="w-full h-full" viewBox="0 0 100 30">
                    <path
                      d="M0 25 L10 22 L20 26 L30 18 L40 20 L50 12 L60 15 L70 8 L80 12 L90 5 L100 8"
                      fill="none"
                      stroke="#4ce6d9"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#142d2a] p-5 rounded-2xl border-l-4 border-primary-400 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary-400 text-sm font-bold">
                lightbulb
              </span>
              <p className="text-xs font-bold text-[#0d1c1b] dark:text-white uppercase">
                Vision Insight
              </p>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug italic">
              "Focus on small wins this week to boost your momentum."
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VisionDetails;
