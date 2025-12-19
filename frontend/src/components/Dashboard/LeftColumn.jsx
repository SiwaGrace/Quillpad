import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVisions } from "../../features/VisionSlice";
import random from "../../assets/logo/quillpad_logo2.png";

const LeftColumn = ({ logoLeaf, progressImages, progressPercent }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    items: visions,
    loading,
    error,
  } = useSelector((state) => state.visions);

  useEffect(() => {
    dispatch(fetchVisions());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      {/* Capture Vision */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <Link to="/createvision" state={{ from: location.pathname }}>
          <button className="bg-linear-to-b from-sky-300 to-sky-400 text-white font-semibold px-6 py-2 rounded-full shadow hover:opacity-90 transition flex items-center justify-between cursor-pointer">
            <img src={logoLeaf} alt="logo" className="h-10" />
            <p>Capture Vision</p>
          </button>
        </Link>
      </div>

      {/* Recent Visions */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="font-semibold text-gray-700 mb-4">Recent Visions</h2>

        {loading && <p className="text-gray-500">Loading visions...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && visions.length === 0 && (
          <p className="text-gray-500">No visions recorded yet.</p>
        )}
        <div className="h-[200px] overflow-y-auto no-scrollbar scroll-shadow overscroll-contain">
          {!loading &&
            visions.map((vision) => (
              <Link
                key={vision._id}
                to={`/visions/${vision._id}`}
                className="flex items-center mt-2 space-x-4 mb-4"
              >
                {/* Optional: add a default image or a progress image */}
                <img
                  src={random}
                  alt={vision.title}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold">{vision.title}</p>
                  <p className="text-sm text-gray-500">
                    {vision.category || "No category"} •{" "}
                    {new Date(vision.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Vision Board Progress */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="font-semibold text-gray-700 mb-4">
          Vision Board Progress
        </h2>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full border-4 border-sky-400 flex items-center justify-center font-semibold text-sky-500">
            {progressPercent}%
          </div>
          <div className="flex space-x-2">
            {progressImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`progress-${idx}`}
                className="w-14 h-14 rounded-lg object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftColumn;
