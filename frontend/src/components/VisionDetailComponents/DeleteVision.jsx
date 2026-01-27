import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeVision } from "../../features/VisionSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// 1. Sleek Confirmation Modal
const ConfirmationModal = ({ isOpen, title, onConfirm, onCancel, loading }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-[100] p-4"
      onClick={loading ? undefined : onCancel}
    >
      <div
        className="bg-white dark:bg-[#1a2e2c] rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-6 border border-gray-100 dark:border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
            Confirm Deletion
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-bold text-gray-900 dark:text-white italic">
              "{title}"
            </span>
            ? This action is permanent.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-500 bg-gray-100 dark:bg-[#0e1b19] dark:text-gray-400 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
            disabled={loading}
          >
            Keep it
          </button>

          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 text-sm font-bold text-white rounded-xl shadow-lg transition-all ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 active:scale-95"
            }`}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Add children and redirectOnDelete to the props here
const DeleteVision = ({ vision, children, redirectOnDelete = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loading = useSelector(
    (state) => state.visions.deletingId === vision?._id,
  );

  if (!vision) return null;

  const handleOpenModal = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stops the card from opening when clicking delete
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await toast.promise(dispatch(removeVision(vision._id)).unwrap(), {
        loading: "Deleting vision...",
        success: <b>Vision successfully deleted!</b>,
        error: <b>Could not delete vision.</b>,
      });

      setIsModalOpen(false);
      // Only navigate if we are told to (Detail Page)
      if (redirectOnDelete) navigate("/vision");
    } catch (error) {
      console.error("Delete failed:", error);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {/* If 'children' exists, we render it inside this div. 
         If not, we show the default big red button.
      */}
      <div onClick={handleOpenModal} className="w-full">
        {children ? (
          children
        ) : (
          <button className="flex items-center space-x-2 text-sm px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition">
            <span className="material-symbols-outlined text-[18px]">
              delete
            </span>
            <span>{loading ? "Deleting..." : "Delete Vision"}</span>
          </button>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        title={vision.title}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />
    </>
  );
};

export default DeleteVision;
