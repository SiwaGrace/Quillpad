import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeVision } from "../../features/VisionSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Reusable confirmation modal
const ConfirmationModal = ({ isOpen, title, onConfirm, onCancel, loading }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50 p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-red-600 border-b pb-2">
          Confirm Deletion
        </h3>
        <p className="text-gray-700">
          Are you sure you want to delete:{" "}
          <span className="font-semibold italic block mt-1">"{title}"</span>?
          This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3 pt-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition cursor-pointer"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md transition 
              ${
                loading
                  ? "bg-red-400"
                  : "bg-red-600 hover:bg-red-700 cursor-pointer"
              }`}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Permanently"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main DeleteVision component
const DeleteVision = ({ vision, modal = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loading = useSelector(
    (state) => state.visions.deletingId === vision?._id
  );

  const handleDelete = useCallback(async () => {
    try {
      await dispatch(removeVision(vision._id)).unwrap();
      toast.success("Vision deleted");

      if (modal) setIsModalOpen(false);
      else {
        // Optionally navigate if you want after deletion without modal
        // navigate("/vision"); // uncomment if needed
      }
    } catch (error) {
      toast.error("Failed to delete vision");
      if (modal) setIsModalOpen(false);
    }
  }, [dispatch, vision, modal]);

  // Open modal for modal version
  const handleOpen = useCallback(
    (e) => {
      if (modal) setIsModalOpen(true);
      else handleDelete();
    },
    [modal, handleDelete]
  );

  return (
    <>
      <button
        onClick={handleOpen}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg shadow-md transition
          ${
            modal
              ? "bg-red-500 text-white hover:bg-red-600"
              : "p-2 text-red-600 hover:bg-red-100"
          }`}
        disabled={loading}
        title="Delete Vision"
      >
        🗑️ {modal && (loading ? "Deleting..." : "Delete Vision")}
      </button>

      {modal && (
        <ConfirmationModal
          isOpen={isModalOpen}
          title={vision.title}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          loading={loading}
        />
      )}
    </>
  );
};

export default DeleteVision;
