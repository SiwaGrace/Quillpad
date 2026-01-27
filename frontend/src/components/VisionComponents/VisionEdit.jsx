import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchVisionById, updateVisionById } from "../../features/VisionSlice";
import toast from "react-hot-toast";

const VisionEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    selected: vision,
    loading,
    error,
  } = useSelector((state) => state.visions);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    startDate: "",
    targetDate: "",
  });

  const categories = [
    { name: "Career", icon: "rocket_launch" },
    { name: "Health & Wellness", icon: "fitness_center" },
    { name: "Personal Development", icon: "psychology" },
    { name: "Spiritual Growth", icon: "auto_awesome" },
    { name: "Relationships", icon: "favorite" },
  ];

  useEffect(() => {
    dispatch(fetchVisionById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (vision) {
      setForm({
        title: vision.title || "",
        description: vision.description || "",
        category: vision.category || "",
        startDate: vision.startDate?.slice(0, 10) || "",
        targetDate: vision.targetDate?.slice(0, 10) || "",
      });
    }
  }, [vision]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateVisionById({ id, data: form })).unwrap();
      toast.success("Vision Refined ✨");
      navigate(`/visions/${id}`);
    } catch (err) {
      toast.error(err || "Failed to update vision");
    }
  };

  if (loading)
    return (
      <div className="max-w-3xl mx-auto mt-20 animate-pulse space-y-8">
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Breadcrumb & Title */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
          <Link to="/vision" className="hover:text-primary-400">
            Visions
          </Link>
          <span>/</span>
          <span className="text-primary-400">Edit Vision</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Refine Your <span className="text-primary-400">Direction</span>
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-12 gap-6 bg-white dark:bg-[#142d2a] p-8 rounded-3xl border border-slate-200 dark:border-[#1a3b38] shadow-2xl shadow-primary-400/5"
      >
        {/* Title */}
        <div className="col-span-12">
          <label className="block text-xs font-black uppercase tracking-widest text-primary-400 mb-2">
            Vision Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full bg-slate-50 dark:bg-[#0e1b19] border-none rounded-2xl py-4 outline-none px-6 text-lg font-semibold focus:ring-2 focus:ring-primary-400 dark:text-white transition-all"
          />
        </div>

        {/* Category Chips */}
        <div className="col-span-12">
          <label className="block text-xs font-black uppercase tracking-widest text-primary-400 mb-3">
            Update Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, category: cat.name }))
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all font-bold text-xs ${
                  form.category === cat.name
                    ? "border-primary-400 bg-primary-400/10 text-primary-400"
                    : "border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-200"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
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
            The Narrative
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            className="w-full bg-slate-50 dark:bg-[#0e1b19] border-none rounded-2xl py-4 px-6 focus:ring-2 outline-none focus:ring-primary-400 dark:text-white transition-all resize-none"
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
            value={form.startDate}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-[#0e1b19] border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary-400 dark:text-white outline-none "
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <label className="block text-xs font-black uppercase tracking-widest text-primary-400 mb-2">
            Target Date
          </label>
          <input
            type="date"
            name="targetDate"
            value={form.targetDate}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-[#0e1b19] border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary-400 dark:text-white outline-none "
          />
        </div>

        {/* Action Buttons */}
        <div className="col-span-12 flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-slate-500 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-[2] py-4 rounded-2xl bg-primary-400 text-slate-900 text-lg font-black shadow-xl shadow-primary-400/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">auto_fix_high</span>
            Save Refinements
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisionEdit;
