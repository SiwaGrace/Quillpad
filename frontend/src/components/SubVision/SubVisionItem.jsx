import { Link, useParams } from "react-router-dom";

const SubVisionItem = ({ subVision }) => {
  const { id: visionId } = useParams();

  const checkStyle =
    subVision.status === "completed"
      ? "text-green-500 bg-green-100"
      : "text-gray-500 bg-gray-100";

  return (
    <Link
      to={`/visions/${visionId}/subvision/${subVision._id}`}
      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-teal-400 transition cursor-pointer"
    >
      <div className="flex items-center space-x-3">
        <div
          className={`h-4 w-4 rounded-full ${checkStyle} flex items-center justify-center`}
        >
          {subVision.status === "completed" && (
            <span className="text-xs">✓</span>
          )}
        </div>

        <h4 className="font-semibold text-gray-800">{subVision.title}</h4>
      </div>

      <div className="text-right">
        <p className="text-teal-600 font-bold">{subVision.progress}%</p>
        <p className="text-xs text-gray-500">
          {subVision.reflections?.length || 0} reflections
        </p>
      </div>
    </Link>
  );
};

export default SubVisionItem;
