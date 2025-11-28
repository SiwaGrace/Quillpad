import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeVision } from "../../features/VisionSlice";
import { useNavigate } from "react-router-dom";

const ConfirmationModal = ({ isOpen, title, onConfirm, onCancel, loading }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 opacity-95 flex justify-center items-center z-50 p-4"
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
          Are you sure you want to delete the vision:
          <span className="font-semibold italic block mt-1">"{title}"</span>
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

const DeleteVision = ({ vision }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const loading = useSelector(
    (state) => state.visions.deletingId === vision?._id
  );

  if (!vision) {
    return <p className="text-red-500 text-sm">Vision data missing.</p>;
  }

  const visionId = vision._id;

  const handleOpenModal = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleDelete = useCallback(async () => {
    try {
      await dispatch(removeVision(visionId)).unwrap();

      handleCloseModal();

      navigate("/vision");
    } catch (error) {
      console.error("Delete failed:", error);
      handleCloseModal();
    }
  }, [dispatch, visionId, navigate, handleCloseModal]);

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="flex items-center space-x-2 text-sm px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300 cursor-pointer"
        disabled={loading}
      >
        {/* Trash Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-trash-2"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" x2="10" y1="11" y2="17" />
          <line x1="14" x2="14" y1="11" y2="17" />
        </svg>

        <span>{loading ? "Deleting..." : "Delete Vision"}</span>
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        title={vision.title}
        onCancel={handleCloseModal}
        onConfirm={handleDelete}
        loading={loading}
      />
    </>
  );
};

export default DeleteVision;
