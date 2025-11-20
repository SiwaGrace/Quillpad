import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addVision } from "../../features/VisionSlice"; // Make sure your slice exports the async thunk

// Initial state for the form
const INITIAL_VISION_STATE = {
  title: "",
  description: "",
  category: "",
  startDate: "",
  targetDate: "",
};

function CaptureVision({ currentUserId }) {
  const dispatch = useDispatch();
  const [visionData, setVisionData] = useState(INITIAL_VISION_STATE);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalVisionData = {
      ...visionData,
      userId: currentUserId,
      status: "not started", // default
    };

    try {
      setLoading(true);
      await dispatch(addVision(finalVisionData)).unwrap(); // unwrap to catch errors
      alert("Vision saved successfully!");
      setVisionData(INITIAL_VISION_STATE); // Reset form
    } catch (error) {
      console.error("Failed to save vision:", error);
      alert("There was an error saving your vision. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-teal-800 mb-6 border-b pb-2">
        💡 Capture a New Vision
      </h2>
      <p className="text-gray-500 mb-8">
        Define your long-term goal and set a path for your spiritual and
        personal growth.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="userId" value={currentUserId || ""} />

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Vision Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={visionData.title}
            onChange={handleChange}
            required
            placeholder="e.g., Become a Virtuous Leader in My Community"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description (The "Why")
          </label>
          <textarea
            id="description"
            name="description"
            value={visionData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the significance and impact of achieving this goal."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 resize-none"
          ></textarea>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={visionData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-white"
            >
              <option value="">Select a Category</option>
              <option value="Spiritual Growth">Spiritual Growth</option>
              <option value="Career">Career</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Personal Development">Personal Development</option>
              <option value="Relationships">Relationships</option>
            </select>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status (Default)
            </label>
            <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-600">
              Not started
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={visionData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="targetDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Target Date
            </label>
            <input
              type="date"
              id="targetDate"
              name="targetDate"
              value={visionData.targetDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Vision & Plan Sub-Goals"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CaptureVision;
