import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeVision } from "../../features/VisionSlice";
import toast from "react-hot-toast";

const DeleteVisionNoModal = ({ vision }) => {
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.visions.deletingId === vision?._id
  );

  const handleDelete = useCallback(async () => {
    // Simple browser confirmation
    if (!window.confirm(`Are you sure you want to delete "${vision.title}"?`)) {
      return;
    }

    try {
      await dispatch(removeVision(vision._id)).unwrap();
      toast.success("Vision deleted");
      // No callback needed; Redux store updates automatically
    } catch (error) {
      toast.error("Failed to delete vision");
    }
  }, [dispatch, vision]);

  return (
    <button
      onClick={handleDelete}
      className="p-2 text-red-600 hover:bg-red-100 rounded-full transition"
      disabled={loading}
      title="Delete Vision"
    >
      🗑️
    </button>
  );
};

export default DeleteVisionNoModal;

// put this on vision card grid
// <DeleteVisionNoModal
//   vision={vision}
//   onSuccess={() => removeCardFromUI(vision._id)}
// />
