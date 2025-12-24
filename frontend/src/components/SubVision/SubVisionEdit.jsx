import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchSubVisionById,
  updateSubVisionById,
} from "../../features/SubVisionSlice";
import { fetchVisionById } from "../../features/VisionSlice";

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
  }, [visionId, subId]);

  useEffect(() => {
    if (subVision) {
      setTitle(subVision.title);
      setDescription(subVision.description);
    }
  }, [subVision]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateSubVisionById({ visionId, subId, data: { title, description } })
    )
      .unwrap()
      .then(() => {
        dispatch(fetchVisionById(visionId));
        navigate(`/visions/${visionId}/subvision/${subId}`);
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <p className="text-center text-teal-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!subVision) return <p>No subvision found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 mt-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Edit SubVision</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SubVisionEdit;
