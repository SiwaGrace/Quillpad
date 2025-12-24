import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeSubVision } from "../../features/SubVisionSlice";
import { fetchVisionById } from "../../features/VisionSlice";

const SubVisionItem = ({ subVision }) => {
  const { id: visionId } = useParams();
  const dispatch = useDispatch();

  const checkStyle =
    subVision.status === "completed"
      ? "text-green-500 bg-green-100"
      : "text-gray-500 bg-gray-100";

  const handleDelete = (e) => {
    e.preventDefault(); // prevent navigating via Link
    if (window.confirm("Are you sure you want to delete this SubVision?")) {
      dispatch(removeSubVision({ visionId, subId: subVision._id }))
        .unwrap()
        .then(() => dispatch(fetchVisionById(visionId)));
    }
  };

  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-teal-400 transition">
      <Link
        to={`/visions/${visionId}/subvision/${subVision._id}`}
        className="flex-1 flex items-center space-x-3"
      >
        <div
          className={`h-4 w-4 rounded-full ${checkStyle} flex items-center justify-center`}
        >
          {subVision.status === "completed" && (
            <span className="text-xs">✓</span>
          )}
        </div>
        <h4 className="font-semibold text-gray-800">{subVision.title}</h4>
      </Link>

      <div className="flex items-center space-x-2">
        <Link
          to={`/visions/${visionId}/subvision/${subVision._id}/edit`}
          className="text-blue-600 hover:underline text-sm"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:underline text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SubVisionItem;
