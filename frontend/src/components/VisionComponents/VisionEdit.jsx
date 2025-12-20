import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
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

  // 1️⃣ fetch vision
  useEffect(() => {
    dispatch(fetchVisionById(id));
  }, [id]);

  // 2️⃣ hydrate form
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

      toast.success("Vision updated");
      navigate(`/visions/${id}`);
    } catch (err) {
      toast.error(err || "Failed to update vision");
    }
  };

  if (loading) return <p className="text-center text-teal-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!vision) return <p>No vision found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
      <h1 className="text-2xl font-bold text-teal-700 mb-6">Edit Vision</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={4}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="Spiritual Growth">Spiritual Growth</option>
            <option value="Career">Career</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Personal Development">Personal Development</option>
            <option value="Relationships">Relationships</option>
          </select>
        </div>

        {/* Dates */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="w-1/2">
            <label className="block font-medium">Target Date</label>
            <input
              type="date"
              name="targetDate"
              value={form.targetDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-teal-600 text-white w-full py-2 rounded hover:bg-teal-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default VisionEdit;
