import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVision, fetchVisions } from "../../features/VisionSlice";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const INITIAL_VISION_STATE = {
  title: "",
  description: "",
  category: "Personal Development", // Default for better UX
  startDate: new Date().toISOString().split("T")[0], // Default to today
  targetDate: "",
};

function CaptureVision() {
  const { user } = useSelector((state) => state.auth);
  const currentUserId = user?._id;
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.visions);
  const [visionData, setVisionData] = useState(INITIAL_VISION_STATE);

  const location = useLocation();
  const navigate = useNavigate();

  const categories = [
    { name: "Career", icon: "rocket_launch" },
    { name: "Health", icon: "fitness_center" },
    { name: "Creative", icon: "palette" },
    { name: "Spiritual", icon: "auto_awesome" },
    { name: "Finance", icon: "payments" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUserId) return toast.error("Please login first.");
    if (!visionData.title.trim()) return toast.error("Title is required.");

    const finalVisionData = {
      ...visionData,
      userId: currentUserId,
      status: "not started",
    };

    try {
      await dispatch(addVision(finalVisionData)).unwrap();
      toast.success("Vision manifested!");
      dispatch(fetchVisions());
      setTimeout(() => navigate(location.state?.from || "/vision"), 500);
    } catch (err) {
      toast.error(err.message || "Failed to save.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary-400/10 text-primary-400 mb-4">
          <span className="material-symbols-outlined text-4xl">lightbulb</span>
        </div>
        <h2 className="text-4xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
          What is your next{" "}
          <span className="text-primary-400 italic">Vision?</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Define your goal, set your timeline, and start the journey.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-12 gap-6 bg-white dark:bg-[#142d2a] p-8 rounded-3xl border border-slate-200 dark:border-[#1a3b38] shadow-2xl shadow-primary-400/5"
      >
        {/* Title: Full Width */}
        <div className="col-span-12">
          <label className="block text-xs font-black uppercase tracking-widest text-primary-400 mb-2">
            Vision Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Master React & Three.js"
            value={visionData.title}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-[#0e1b19] border-none rounded-2xl py-4 px-6 text-lg font-semibold focus:ring-2 focus:ring-primary-400 dark:text-white transition-all outline-none "
          />
        </div>

        {/* Category: Horizontal Scroll Chips */}
        <div className="col-span-12">
          <label className="block text-xs font-black uppercase tracking-widest text-primary-400 mb-3">
            Category
          </label>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() =>
                  setVisionData((prev) => ({ ...prev, category: cat.name }))
                }
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 transition-all font-bold text-sm ${
                  visionData.category === cat.name
                    ? "border-primary-400 bg-primary-400/10 text-primary-400 shadow-lg shadow-primary-400/20"
                    : "border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-200"
                }`}
              >
                <span className="material-symbols-outlined text-lg">
                  {cat.icon}
                </span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="col-span-12">
          <label className="block text-xs font-black uppercase tracking-widest text-primary-400 mb-2">
            Detailed Intention
          </label>
          <textarea
            name="description"
            value={visionData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the end result as if it has already happened..."
            className="w-full bg-slate-50 dark:bg-[#0e1b19] border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary-400 dark:text-white transition-all resize-none outline-none "
          />
        </div>

        {/* Dates */}
        <div className="col-span-12 md:col-span-6">
          <label className="block text-xs font-black uppercase tracking-widest text-primary-400 mb-2">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={visionData.startDate}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-[#0e1b19] border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary-400 dark:text-white appearance-none outline-none "
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <label className="block text-xs font-black uppercase tracking-widest text-primary-400 mb-2">
            Target Date
          </label>
          <input
            type="date"
            name="targetDate"
            value={visionData.targetDate}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-[#0e1b19] border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary-400 dark:text-white outline-none "
          />
        </div>

        {/* Submit Action */}
        <div className="col-span-12 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-primary-400 text-slate-900 text-lg font-black shadow-xl shadow-primary-400/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-spin material-symbols-outlined">
                sync
              </span>
            ) : (
              <>
                <span>Begin Vision Journey</span>
                <span className="material-symbols-outlined">east</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CaptureVision;
