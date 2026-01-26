import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVisions } from "../../features/VisionSlice";
import random from "../../assets/logo/quillpad_logo2.png";
import DashVisionCard from "./DashVisionCard";
import { MdOutlineStarBorder, MdArrowForward } from "react-icons/md";

const VisionsDataEntries = ({ logoLeaf }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    items: visions,
    loading,
    error,
  } = useSelector((state) => state.visions);

  useEffect(() => {
    dispatch(fetchVisions());
  }, [dispatch]);

  return (
    <>
      <div className="space-y-6">
        {/* Capture Vision */}
        <div className="bg-white p-6 rounded-xl shadow-sm"></div>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6 px-1">
            <h2 className="text-xl font-bold tracking-tight">Your Visions</h2>
            <button
              onClick={() => navigate("/vision")}
              className="text-sm text-gray-500 hover:text-primary flex items-center gap-1 transition-colors cursor-pointer"
            >
              View all <MdArrowForward />
            </button>
          </div>

          {/* Loading & Error States */}
          {loading && (
            <p className="text-gray-500 animate-pulse">
              Loading your visions...
            </p>
          )}
          {error && <p className="text-red-500">Error: {error}</p>}

          {!loading && visions.length === 0 && (
            <div className="p-8 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
              <p className="text-gray-500">
                No visions recorded yet. Start dreaming!
              </p>
            </div>
          )}

          {/* The Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!loading &&
              visions.slice(0, 2).map((vision) => (
                <Link
                  key={vision._id}
                  to={`/visions/${vision._id}`}
                  className="block group"
                >
                  <DashVisionCard
                    // Use a default icon if none provided in DB
                    icon={
                      vision.icon || (
                        <MdOutlineStarBorder className=" text-primary-400 w-8 h-10 " />
                      )
                    }
                    title={vision.title}
                    // Using category and date as the subtitle
                    subtitle={`${vision.category || "General"} • ${new Date(vision.createdAt).toLocaleDateString()}`}
                    description={
                      vision.description || "No description provided."
                    }
                    progress={vision.progress || 0}
                  />
                </Link>
              ))}
          </div>
        </section>
      </div>
      <div></div>
    </>
  );
};

export default VisionsDataEntries;
