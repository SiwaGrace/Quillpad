import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchVisions } from "../features/VisionSlice";
import { Link } from "react-router-dom";
import logoLeaf from "../assets/logo/quillpad_logo3.png";

// --- Helper Component: CircularProgressBar (Adapted to new size/color) ---
const CircularProgressBar = ({ progress, size = 60 }) => {
  const radius = size / 2 - 5; // Adjusted for padding/stroke
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const strokeColor = progress === 100 ? "text-green-600" : "text-teal-600";
  const bgColor = "text-success-500";

  return (
    <div className={`relative h-[${size}px] w-[${size}px]`}>
      <svg
        className="w-full h-full transform -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth="5"
          fill="none"
          className={bgColor}
          stroke="currentColor"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth="5"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${strokeColor} transition-all duration-500`}
          stroke="currentColor"
        />
      </svg>
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-gray-700">
        {progress}%
      </span>
    </div>
  );
};

// --- Helper Component: SubVisionItem ---
const SubVisionItem = ({ subVision }) => {
  const checkStyle =
    subVision.status === "completed"
      ? "text-green-500 bg-green-100"
      : "text-gray-500 bg-gray-100";

  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-teal-400 transition cursor-pointer">
      <div className="flex items-center space-x-3">
        {/* Status Circle */}
        <div
          className={`h-4 w-4 rounded-full ${checkStyle} flex items-center justify-center`}
        >
          {subVision.status === "completed" && (
            <span className="text-xs">✓</span>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{subVision.title}</h4>
        </div>
      </div>

      {/* Progress */}
      <div className="text-right text-sm">
        <p className="font-bold text-teal-600">{subVision.progress || 0}%</p>
        <p className="text-xs text-gray-500">
          {subVision.reflections.length} reflections
        </p>
      </div>
    </div>
  );
};

// --- Helper Component: Journal Reflection Item (Mock) ---
const JournalReflectionItem = ({ title, status }) => {
  return (
    <Link
      to={`/journals/${title.replace(/\s/g, "-")}`}
      className="flex justify-between items-center p-3 hover:bg-teal-50 transition border-b border-gray-300"
    >
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0"></div>
        <p className="font-medium text-gray-700 truncate">{title}</p>
      </div>
      <span className="text-green-500 text-xs font-semibold">
        ✓ Seen {status}
      </span>
    </Link>
  );
};

// ------------------------------------------------------------------------------------------------
// --- Main Component: VisionDetails ---
// ------------------------------------------------------------------------------------------------
const VisionDetails = () => {
  const dispatch = useDispatch();
  const { id: visionId } = useParams();

  const {
    items: visions,
    loading,
    error,
  } = useSelector((state) => state.visions);
  const vision = visions.find((v) => v._id === visionId);

  // FIX FOR RELOAD
  useEffect(() => {
    if (visionId && !vision && !loading) {
      dispatch(fetchVisions());
    }
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
    (sub) => sub.status === "completed"
  ).length;
  const subVisionCount = vision.subVisions.length;

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
          <button className="text-sm text-gray-500 hover:text-teal-600 transition">
            ⋮ Actions
          </button>
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
            <div className="pt-6">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold text-teal-800 mb-4">
                  Sub-Visions ({subVisionCount})
                </h2>
                {/* Capture Vision */}
                <Link to="/createsub-vision">
                  <button
                    className="text-primary-500 font-semibold flex items-center gap-2 cursor-pointer
                     hover:text-primary-600 transition"
                  >
                    <img src={logoLeaf} alt="logo" className="h-10" />
                    <p>add sub-vision</p>
                  </button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white">
                {vision.subVisions.length > 0 ? (
                  vision.subVisions.map((sub, index) => (
                    <SubVisionItem key={index} subVision={sub} />
                  ))
                ) : (
                  <p className="text-gray-500 italic sm:col-span-2">
                    No sub-visions defined yet.
                  </p>
                )}
              </div>
            </div>
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
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Journal Reflections on Vision
              </h3>
              <div className="space-y-2">
                {/* Mocking the journal entries for the vision */}
                <JournalReflectionItem
                  title="Initial Thoughts & Goals"
                  status="✔ Seen"
                />
                <JournalReflectionItem
                  title="Overcoming Coding Block"
                  status="✔ Seen"
                />

                {vision.reflections.length > 0 &&
                  vision.reflections.map((refId) => (
                    // In a real app, you'd fetch the journal title here.
                    <p key={refId} className="text-sm text-gray-500">
                      Reflection ID: {refId}
                    </p>
                  ))}

                {vision.reflections.length === 0 && (
                  <p className="text-sm text-gray-500 italic">
                    No general journal reflections yet.
                  </p>
                )}
              </div>
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
