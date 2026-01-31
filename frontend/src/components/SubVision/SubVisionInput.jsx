import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addSubVision } from "../../features/SubVisionSlice";
import { fetchVisionById } from "../../features/VisionSlice";

const SubVisionInput = () => {
  const { id: visionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "not started", // locked default
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(addSubVision({ visionId, data: form }));
    dispatch(fetchVisionById(visionId));
    navigate(`/visions/${visionId}`);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4 text-teal-700">
        Create Sub-Vision
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Sub-Vision Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter the sub-vision title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-200 outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Describe this sub-vision"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-200 outline-none p-2 rounded focus:ring-2 focus:ring-teal-500"
            rows={4}
          />
        </div>

        {/* status */}
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-600">
            Not started
          </div>
        </div>

        <button className="bg-teal-600 text-white py-2 rounded w-full hover:bg-teal-700 font-semibold">
          Create
        </button>
      </form>
    </div>
  );
};

export default SubVisionInput;
