import React, { useState, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVision, fetchVisions } from "../../features/VisionSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const INITIAL_VISION_STATE = {
  title: "",
  description: "",
  category: "",
  startDate: "",
  targetDate: "",
};

function CaptureVision() {
  const { user } = useSelector((state) => state.auth);
  const currentUserId = user?.user?._id;
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.visions);
  const [visionData, setVisionData] = useState(INITIAL_VISION_STATE);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("AUTH USER:", user);
    console.log("USER ID:", currentUserId);

    if (!currentUserId) {
      toast.error("You must be logged in to create a vision.");
      return;
    }

    if (!visionData.title.trim()) {
      toast.error("Vision title is required.");
      return;
    }

    const finalVisionData = {
      ...visionData,
      userId: currentUserId,
      status: "not started",
    };

    try {
      await dispatch(addVision(finalVisionData)).unwrap();
      // alert("Vision saved successfully!");
      toast.success("Vision saved successfully!");
      setVisionData(INITIAL_VISION_STATE);
      dispatch(fetchVisions()); // refresh all visions
      setTimeout(() => navigate("/home"), 500);
    } catch (err) {
      toast.error(err.message || "Failed to save vision.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-teal-800 mb-6 border-b pb-2">
        💡 Capture a New Vision
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="userId" value={currentUserId || ""} />

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vision Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={visionData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none  focus:border-teal-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={visionData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none  focus:border-teal-500"
          />
        </div>

        {/* Category & Status */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={visionData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none  focus:border-teal-500"
            >
              <option value="">Select Category</option>
              <option value="Spiritual Growth">Spiritual Growth</option>
              <option value="Career">Career</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Personal Development">Personal Development</option>
              <option value="Relationships">Relationships</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-600">
              Not started
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={visionData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none  focus:border-teal-500"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Date
            </label>
            <input
              type="date"
              name="targetDate"
              value={visionData.targetDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none  focus:border-teal-500"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-teal-600 text-white text-lg font-medium shadow-md hover:bg-teal-700 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Saving..." : "Save Vision & Plan Sub-Goals"}
        </button>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default CaptureVision;
