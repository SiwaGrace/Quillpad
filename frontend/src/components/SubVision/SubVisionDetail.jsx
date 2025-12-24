import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchSubVisionById,
  updateSubVisionById,
} from "../../features/SubVisionSlice";
import { fetchJournals } from "../../features/JournalSlice";
import { fetchVisionById } from "../../features/VisionSlice";

const SubVisionDetail = () => {
  const { id: visionId, subId } = useParams();
  const dispatch = useDispatch();
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
    if (subVision) {
      setStatus(subVision.status);
    }
  }, [subVision]);

  if (loading) return <p className="text-center text-teal-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!subVision) return <p>No details found.</p>;

  const subVisionJournals = journals.filter(
    (j) => j.subVisionId?._id === subId
  );
  const progress = subVision.progress;
  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 mt-6 rounded-lg">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-800">{subVision.title}</h1>
        <Link
          to="/journal/new"
          state={{
            redirectTo: `/visions/${visionId}/subvision/${subId}`,
            visionId,
            subVisionId: subId,
          }}
          className=" text-indigo-700 underline rounded-md"
        >
          New Journal
        </Link>
      </div>

      <p className="mt-2 text-gray-600">{subVision.description}</p>

      <div className="mt-4 grid grid-cols-2 text-sm">
        <div>
          <strong>Status:</strong>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="ml-2 border px-2 py-1 rounded"
          >
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button
            disabled={loading}
            onClick={() => {
              dispatch(
                updateSubVisionById({
                  visionId,
                  subId,
                  data: { status },
                })
              );
              dispatch(fetchVisionById(visionId));
            }}
            className="ml-3 bg-teal-600 text-white px-3 py-1 rounded text-sm"
          >
            Update
          </button>
        </div>

        <p>
          <strong>Progress:</strong> {progress}%
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Journal Reflections ({subVisionJournals.length})
        </h2>
        <ul className="list-disc ml-6 text-gray-600">
          {subVisionJournals.length > 0 ? (
            <ul className="space-y-2 mt-2">
              {subVisionJournals.map((j) => (
                <li
                  key={j._id}
                  className="p-3 bg-gray-50 rounded border hover:bg-teal-50 transition"
                >
                  <p className="font-medium text-gray-800">{j.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(j.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic mt-2">
              No journal reflections yet for this sub-vision.
            </p>
          )}
        </ul>
      </div>

      <Link
        to={`/visions/${visionId}`}
        className="text-teal-600 underline mt-6 block"
      >
        Back to Vision
      </Link>
    </div>
  );
};

export default SubVisionDetail;
