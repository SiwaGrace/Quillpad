import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVisions } from "../features/VisionSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
// NOTE: For the toggle, you would import icons here, e.g.,
import { MdViewList, MdViewModule } from "react-icons/md";
import v_image from "../assets/img/long_pcimage.jpg";
import DeleteVision from "../components/VisionDetailComponents/DeleteVision";
import CircularProgressBar from "../components/VisionDetailComponents/CircularProgressBar";

// --- Helper Component for Status Badge (Unchanged) ---
const StatusBadge = ({ status }) => {
  const baseStyle = "px-3 py-1 text-xs font-semibold rounded-full";
  switch (status) {
    case "completed":
      return (
        <span className={`${baseStyle} bg-green-100 text-green-800`}>
          Completed
        </span>
      );
    case "in progress":
      return (
        <span className={`${baseStyle} bg-yellow-100 text-yellow-800`}>
          In Progress
        </span>
      );
    case "not started":
    default:
      return (
        <span className={`${baseStyle} bg-gray-100 text-gray-800`}>
          Not Started
        </span>
      );
  }
};

// --- NEW: Grid View Component ---
const VisionCardGrid = ({ visions }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {visions.map((vision) => (
        <div
          key={vision._id}
          onClick={() => navigate(`/visions/${vision._id}`)}
          // The parent element must be relative to position children absolutely
          className="block rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 overflow-hidden relative"
        >
          {/* === 1. IMAGE SECTION (TOP HALF) === */}
          <div className="relative h-40 w-full bg-gray-200">
            <img
              // Corrected image source interpolation
              src={`${v_image}` || "[Image of abstract geometric background]"}
              alt={`Image for ${vision.title}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* === FLOATING ELEMENTS OVER IMAGE === */}
          {/* Status Badge: Top Left */}
          <div className="absolute top-3 left-3 z-10">
            <StatusBadge status={vision.status} />
          </div>
          {/* Circular Progress Bar: Top Right */}
          <div className="absolute top-3 right-3 z-10">
            <CircularProgressBar progress={vision.progress} size={56} />
          </div>

          {/* === 2. DATA SECTION (BOTTOM HALF) === */}
          {/* Removed h-full here to allow the height to adjust based on content */}
          <div className="p-5 bg-white flex flex-col justify-start">
            {/* Header (Title and Category) */}
            <div className="mb-4">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold text-teal-800 truncate mb-1">
                  {vision.title}
                </h3>
                <DeleteVision vision={vision} />
              </div>
              <p className="text-sm text-gray-500">
                {vision.category || "Uncategorized"}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent outer Link click
                  navigate(`/visions/${vision._id}/edit`);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
             bg-teal-600 text-white font-medium shadow-sm
             hover:bg-teal-700 transition"
              >
                ✏️ Edit Vision
              </button>
            </div>

            {/* NO LONGER NEEDED: Progress & Status elements were here, now they are floating above the image */}

            {/* Footer Stats */}
            {/* Removed bg-amber-800 which was likely a debugging artifact */}
            <div className="flex justify-between text-sm text-gray-600 border-t pt-3">
              <p>
                Steps:
                <span className="font-semibold text-teal-600 ml-1">
                  {vision.subVisionCount}
                </span>
              </p>
              <p>
                Target:
                <span className="font-semibold ml-1">
                  {new Date(vision.targetDate).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Main Component ---
const VisionBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState("all");
  // NEW STATE: Toggle between 'list' (table) and 'grid' (cards)
  const [viewMode, setViewMode] = useState("list");

  // Get data directly from Redux
  const {
    items: visions,
    loading,
    error,
  } = useSelector((state) => state.visions);

  useEffect(() => {
    if (!visions.length) {
      dispatch(fetchVisions());
    }
  }, [dispatch, visions.length]);

  // DYNAMIC FILTER GENERATION
  const dynamicFilterOptions = useMemo(() => {
    const fixedOptions = [
      { label: "All", value: "all" },
      { label: "In Progress", value: "in progress" },
      { label: "Completed", value: "completed" },
      { label: "Not Started", value: "not started" },
    ];

    const categories = visions
      .map((vision) => vision.category)
      .filter((category) => category && category.trim() !== "");

    const uniqueCategories = [...new Set(categories)];

    const topCategories = uniqueCategories.slice(0, 4);
    const topCategoryOptions = topCategories.map((cat) => ({
      label: cat,
      value: cat,
    }));

    return [...fixedOptions, ...topCategoryOptions];
  }, [visions]);

  // FILTERING LOGIC
  const filteredVisions = visions.filter((vision) => {
    if (filter === "all") return true;

    if (["in progress", "completed", "not started"].includes(filter)) {
      return vision.status === filter;
    }

    return vision.category === filter;
  });
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-10 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-teal-800">
          All Visions ({filteredVisions.length})
        </h1>
        <Link to="/createvision" state={{ from: location.pathname }}>
          <button className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg shadow-md hover:bg-teal-700 transition cursor-pointer">
            + New Vision
          </button>
        </Link>
      </header>

      {/* --- Filter Bar and Toggle --- */}
      <div className="flex flex-col gap-8 mb-8">
        {/* Filter Buttons */}
        <ul className="flex flex-wrap gap-2 items-center mb-4 md:mb-0">
          {dynamicFilterOptions.map((option) => (
            <li
              key={option.value}
              className={`
                px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition 
                ${
                  filter === option.value
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
              onClick={() => setFilter(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>

        {/* Search and View Toggle */}
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search visions..."
            className="p-2 border border-gray-300 rounded-lg shadow-sm w-full max-w-sm focus:outline-none  focus:border-teal-500"
          />
          {/* View Toggle Buttons */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 transition ${
                viewMode === "list"
                  ? "bg-teal-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
              aria-label="List View"
            >
              <MdViewList />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 transition ${
                viewMode === "grid"
                  ? "bg-teal-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
              aria-label="Grid View"
            >
              <MdViewModule />
            </button>
          </div>
        </div>
      </div>

      {/* --- Loading and Error States --- */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-xl text-teal-600">Loading visions...</p>
        </div>
      )}
      {error && (
        <div className="text-center py-12">
          <p className="text-xl text-red-500">Error loading visions: {error}</p>
        </div>
      )}

      {/* --- Empty State --- */}
      {!loading && !error && filteredVisions.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-lg mt-8">
          <p className="text-xl font-semibold text-gray-600 mb-4">
            No visions found matching the criteria.
          </p>
          <button className="text-teal-600 hover:text-teal-800 font-medium">
            Clear filters or start a new vision!
          </button>
        </div>
      )}

      {/* --- CONDITIONAL RENDERING --- */}
      {!loading && !error && filteredVisions.length > 0 && (
        <>
          {/* 1. LIST VIEW (Default/Table) */}
          {viewMode === "list" && (
            <div className="bg-white shadow-xl rounded-xl overflow-hidden">
              <div className="min-w-full divide-y divide-gray-200">
                {/* Header Row */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="col-span-4">Vision Title</span>
                  <span className="col-span-2">Category</span>
                  <span className="col-span-2">Status</span>
                  <span className="col-span-2">Progress</span>
                  <span className="col-span-1 text-center">Steps</span>
                  <span className="col-span-1">Target Date</span>
                </div>

                {/* Vision Data Rows */}
                {filteredVisions.map((vision) => (
                  <Link
                    key={vision._id}
                    to={`/visions/${vision._id}`} // Use Link for navigation
                    className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-teal-50 transition duration-100 cursor-pointer items-center"
                  >
                    <div className="col-span-4 font-semibold text-gray-800 truncate">
                      {vision.title}
                    </div>
                    <div className="col-span-2 text-sm text-gray-600">
                      {vision.category}
                    </div>
                    <div className="col-span-2">
                      <StatusBadge status={vision.status} />
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <CircularProgressBar
                        progress={vision.progress}
                        size={56}
                      />
                    </div>
                    <div className="col-span-1 text-sm text-center font-medium text-teal-600">
                      {vision.subVisionCount}
                    </div>
                    <div className="col-span-1 text-sm text-gray-500">
                      {new Date(vision.targetDate).toLocaleDateString()}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 2. GRID VIEW (Cards) */}
          {viewMode === "grid" && <VisionCardGrid visions={filteredVisions} />}
        </>
      )}
    </div>
  );
};

export default VisionBoard;
