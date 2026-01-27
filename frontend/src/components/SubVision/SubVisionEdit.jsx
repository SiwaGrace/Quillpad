import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchSubVisionById,
  updateSubVisionById,
} from "../../features/SubVisionSlice";
import { fetchVisionById } from "../../features/VisionSlice";
import toast from "react-hot-toast";

const SubVisionEdit = () => {
  const { id: visionId, subId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    selected: subVision,
    loading,
    error,
  } = useSelector((state) => state.subvisions);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchSubVisionById({ visionId, subId }));
  }, [visionId, subId, dispatch]);

  useEffect(() => {
    if (subVision) {
      setTitle(subVision.title);
      setDescription(subVision.description);
    }
  }, [subVision]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateSubVisionById({ visionId, subId, data: { title, description } }),
    )
      .unwrap()
      .then(() => {
        dispatch(fetchVisionById(visionId));
        toast.success("Milestone recalibrated");
        navigate(`/visions/${visionId}/subvision/${subId}`);
      })
      .catch((err) => toast.error("Failed to update milestone"));
  };

  if (loading)
    return (
      <div className="max-w-3xl mx-auto mt-20 animate-pulse space-y-6">
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/3"></div>
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary-400 transition-colors mb-4"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Cancel Editing
        </button>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Refine Milestone <span className="text-primary-400">Directive</span>
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#142d2a] p-8 rounded-3xl border border-slate-200 dark:border-[#1a3b38] shadow-2xl shadow-primary-400/5 space-y-8"
      >
        {/* Title Input */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-primary-400 mb-2">
            Milestone Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What is this specific step?"
            className="w-full bg-slate-50 dark:bg-[#0e1b19] border-none rounded-2xl py-4 px-6 text-xl font-bold focus:ring-2 focus:ring-primary-400 dark:text-white transition-all"
          />
        </div>

        {/* Description Input - The "Hero" treatment */}
        <div className="relative">
          <label className="block text-xs font-black uppercase tracking-widest text-primary-400 mb-2">
            The Mission Directive
          </label>
          <span className="absolute left-4 top-14 text-4xl text-primary-400/10 font-serif pointer-events-none">
            “
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            placeholder="Describe the intention behind this step..."
            className="w-full bg-slate-50 dark:bg-[#0e1b19] border-l-4 border-primary-400/20 rounded-r-2xl py-6 px-8 text-lg italic leading-relaxed focus:ring-0 focus:border-primary-400 dark:text-slate-300 transition-all resize-none"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-8 py-4 rounded-2xl text-slate-400 font-bold hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            Discard
          </button>
          <button
            type="submit"
            className="px-10 py-4 rounded-2xl bg-primary-400 text-slate-900 text-lg font-black shadow-xl shadow-primary-400/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">
              published_with_changes
            </span>
            Save Milestone
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubVisionEdit;
