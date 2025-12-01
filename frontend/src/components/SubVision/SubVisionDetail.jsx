import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchSubVisionById } from "../../features/SubVisionSlice";

const SubVisionDetail = () => {
  const { id: visionId, subId } = useParams();
  const dispatch = useDispatch();

  const {
    current: subVision,
    loading,
    error,
  } = useSelector((state) => state.subvisions);

  useEffect(() => {
    dispatch(fetchSubVisionById({ visionId, subId }));
  }, [visionId, subId]);

  if (loading) return <p className="text-center text-teal-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!subVision) return <p>No details found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 mt-6 rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800">{subVision.title}</h1>

      <p className="mt-2 text-gray-600">{subVision.description}</p>

      <div className="mt-4 grid grid-cols-2 text-sm">
        <p>
          <strong>Status:</strong> {subVision.status}
        </p>
        <p>
          <strong>Progress:</strong> {subVision.progress}%
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Reflections ({subVision.reflections?.length || 0})
        </h2>
        <ul className="list-disc ml-6 text-gray-600">
          {subVision.reflections.map((r, i) => (
            <li key={i}>Reflection ID: {r}</li>
          ))}
        </ul>
      </div>

      <Link
        to={`/vision/${visionId}`}
        className="text-teal-600 underline mt-6 block"
      >
        Back to Vision
      </Link>
    </div>
  );
};

export default SubVisionDetail;
