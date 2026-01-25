import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchVisions } from "../../features/VisionSlice";
import { Link } from "react-router-dom";
import DeleteVision from "../VisionDetailComponents/DeleteVision";
import SubvisonList from "../SubVision/SubvisonList";
import { fetchJournals } from "../../features/JournalSlice";
import JournalReflectionItem from "../VisionDetailComponents/JournalReflectionItem";
import CircularProgressBar from "../VisionDetailComponents/CircularProgressBar";

const VisionDetails = () => {
  const dispatch = useDispatch();
  const { id: visionId } = useParams();

  const {
    items: visions,
    loading,
    error,
  } = useSelector((state) => state.visions);
  const { entries: journals } = useSelector((state) => state.journal);
  const vision = visions.find((v) => v._id === visionId);

  // FIX FOR RELOAD
  useEffect(() => {
    if (visionId && !vision && !loading) {
      dispatch(fetchVisions());
    }
    dispatch(fetchJournals({ visionId }));
  }, [dispatch, visionId, vision, loading]);

  if (loading && !vision) {
    return (
      <div className="p-8 text-center text-teal-600">
        <h2 className="text-2xl font-semibold">Loading vision details...</h2>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        <h2 className="text-2xl font-semibold">
          Error loading details: {error}
        </h2>
      </div>
    );
  }
  if (!vision) {
    return (
      <div className="p-8 text-center text-gray-600">
        <h2 className="text-2xl font-semibold">Vision not found.</h2>
        <p>ID: {visionId}</p>
      </div>
    );
  }

  // Calculate Sub-Vision Completion Count
  const completedSubVisions = vision.subVisions.filter(
    (sub) => sub.status === "completed",
  ).length;
  const subVisionCount = vision.subVisions.length;

  // Journals associated with this vision
  const visionJournals = journals.filter((j) => j.visionId?._id === visionId);
  // const progress = 67;
  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-8">
        {/* === HEADER SECTION (TITLE, CATEGORY, STATUS) === */}
        <div className="flex justify-between items-start  pb-6 mb-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Category:{" "}
              <span className="font-semibold text-teal-700">
                {vision.category || "N/A"}
              </span>
            </p>
            <h1 className="text-4xl font-extrabold text-gray-800">
              {vision.title}
            </h1>
          </div>
          {/* Action buttons (Mock) */}
          <DeleteVision vision={vision} />
        </div>

        {/* === MAIN CONTENT GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* --------------------- COLUMN 1: VISION DETAILS & SUB-VISIONS --------------------- */}
          <div className="md:col-span-2 space-y-8">
            {/* Vision Metadata (Status, Dates, Description) */}
            <div className="flex flex-col space-y-2 text-gray-600">
              <div className="grid grid-cols-2 text-sm">
                <p>
                  <span className="font-semibold mr-1">Status:</span>
                  <span className="capitalize">{vision.status}</span>
                </p>
                <p>
                  <span className="font-semibold mr-1">Start Date:</span>
                  {vision.startDate
                    ? new Date(vision.startDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div className="grid grid-cols-2 text-sm">
                <p>
                  <span className="font-semibold mr-1">Target Date:</span>
                  {vision.targetDate
                    ? new Date(vision.targetDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <span className="font-semibold mr-1">Sub-Visions:</span>
                  {completedSubVisions}/{subVisionCount} Completed
                </p>
              </div>
              <div className="pt-4">
                <p className="font-semibold text-gray-700 mb-1">Description:</p>
                <p className="text-gray-600 text-sm italic">
                  {vision.description || "No detailed description provided."}
                </p>
              </div>
            </div>

            {/* Sub-Visions List */}

            <SubvisonList
              subVisionCount={subVisionCount}
              vision={vision}
              // SubVisionItem={SubVisionItem}
            />
          </div>

          {/* --------------------- COLUMN 2: PROGRESS & REFLECTIONS --------------------- */}
          <div className="space-y-8">
            {/* Overall Progress */}
            <div className="flex flex-col items-center p-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Overall Vision Progress
              </h3>
              <CircularProgressBar progress={vision.progress} size={150} />
            </div>

            {/* Journal Reflections */}
            <div className="rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Journal Reflections
                </h3>
                <Link
                  to="/journal/new"
                  state={{
                    redirectTo: `/visions/${visionId}`,
                    visionId,
                  }}
                  className=" text-indigo-700 underline rounded-md"
                >
                  New Journal
                </Link>
              </div>

              {visionJournals.length > 0 ? (
                <div className="space-y-2">
                  {visionJournals.map((j) => (
                    <JournalReflectionItem key={j._id} journal={j} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No journal reflections yet for this vision.
                </p>
              )}
            </div>

            {/* Daily Prompt */}
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-md font-bold text-gray-700 mb-2">
                Daily Prompt for Vision
              </h3>
              <p className="text-gray-600 italic">
                What is one fear holding you back, how will you overcome it?
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-right text-gray-400 mt-6">
          Offline Sync: All changes saved
        </p>
      </div>
    </div>
  );
};

export default VisionDetails;
