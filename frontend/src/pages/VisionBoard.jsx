import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVisions } from "../features/VisionSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
// NOTE: For the toggle, you would import icons here, e.g.,
import { MdViewList, MdViewModule } from "react-icons/md";
import CircularProgressBar from "../components/VisionDetailComponents/CircularProgressBar";
import VisionCardGrid from "../components/VisionComponents/VisionCardGrid";
import StatusBadge from "../components/VisionComponents/StatusBadge";
import { GoSearch } from "react-icons/go";
import VisionListView from "../components/VisionComponents/VisionListView";
import SearchBar from "../components/SearchBar";

// --- Main Component ---
const VisionBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  // NEW STATE: Toggle between 'list' (table) and 'grid' (cards)
  const [viewMode, setViewMode] = useState("grid");

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
    // 1. First, check the dropdown filter (Status/Category)
    let matchesFilter = true;
    if (filter !== "all") {
      if (["in progress", "completed", "not started"].includes(filter)) {
        matchesFilter = vision.status === filter;
      } else {
        matchesFilter = vision.category === filter;
      }
    }
    // 2. Then, check the Search query (Title/Description)
    const matchesSearch =
      vision.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vision.description?.toLowerCase().includes(searchQuery.toLowerCase());

    // 3. Only return true if BOTH are true
    return matchesFilter && matchesSearch;
  });
  return (
    <div>
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 py-4 bg-white dark:bg-[#0e1b19]/80 backdrop-blur-md dark:border-[#1e3230]">
        {/* Search Bar Container */}
        <div className="flex-1 max-w-md">
          {" "}
          {/* Prevents it from getting too wide on desktop */}
          <SearchBar
            onSearch={(val) => setSearchQuery(val)}
            placeholder="Search your visions..."
          />
        </div>

        {/* Actions Area */}
        <div className="flex items-center gap-2 md:gap-4 ml-3 md:ml-6 ">
          {/* Notification Button - Hidden on very small screens or kept as icon sm:flex*/}
          <button className="hidden  w-10 h-10 items-center justify-center rounded-xl bg-[#e8f3f2] dark:bg-[#1a2e2c] text-[#0e1b19] dark:text-white hover:bg-[#d8e8e6] dark:hover:bg-[#243f3c] transition-colors">
            <span className="material-symbols-outlined text-[22px]  ">
              notifications
            </span>
          </button>

          {/* New Vision Button */}
          <Link to="/createvision" state={{ from: location.pathname }}>
            <button className="flex items-center gap-2 px-3 md:px-5 py-2.5 bg-[#4ce6d9] text-[#0e1b19] font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-[#4ce6d9]/20 transition-all active:scale-95">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span className="hidden md:inline">New Vision</span>
            </button>
          </Link>
        </div>
      </header>

      {/* Vision title, List, Grid */}
      <div className="mt-12">
        <h1 className="text-3xl font-black text-black">
          All Visions ({filteredVisions.length})
        </h1>

        {/*  View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          {/* Branding / Tagline */}
          <div>
            <h1 className="text-sm md:text-base font-bold  tracking-wide text-[#50958f] dark:text-[#4ce6d9]/80">
              Transform your dreams into structured milestones
            </h1>
          </div>

          {/* View Toggle Buttons */}
          <div className="flex h-11 bg-[#e8f3f2] dark:bg-[#1a2e2c] p-1 rounded-xl w-fit self-end sm:self-auto transition-all">
            {/* Card/Grid Button */}
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-3 sm:px-6 rounded-lg transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-white dark:bg-[#0e1b19] shadow-sm text-[#0e1b19] dark:text-white font-bold"
                  : "text-[#50958f] hover:text-[#0e1b19] dark:hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                grid_view
              </span>
              <span className="hidden sm:inline text-sm">Card</span>
            </button>

            {/* List Button */}
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-3 sm:px-6 rounded-lg transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-white dark:bg-[#0e1b19] shadow-sm text-[#0e1b19] dark:text-white font-bold"
                  : "text-[#50958f] hover:text-[#0e1b19] dark:hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                list
              </span>
              <span className="hidden sm:inline text-sm">List</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- Filter Bar and Toggle --- */}
      <div className="flex flex-col gap-8 my-8">
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
            No Visions Found
          </p>
          <button
            onClick={() => {
              setFilter("all");
              setSearchQuery("");
            }}
            className="text-teal-600 hover:text-teal-800 font-medium"
          >
            Clear filters or start a new vision!
          </button>
        </div>
      )}

      {/* --- CONDITIONAL RENDERING --- */}
      {!loading && !error && filteredVisions.length > 0 && (
        <>
          {/* 1. LIST VIEW (Default/Table) */}
          {viewMode === "list" && (
            <VisionListView filteredVisions={filteredVisions} />
          )}

          {/* 2. GRID VIEW (Cards) */}
          {viewMode === "grid" && <VisionCardGrid visions={filteredVisions} />}
        </>
      )}
    </div>
  );
};

export default VisionBoard;
