import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeSubVision } from "../../features/SubVisionSlice";
import { fetchVisionById } from "../../features/VisionSlice";
import toast from "react-hot-toast";

const SubVisionItem = ({ subVision }) => {
  const { id: visionId } = useParams();
  const dispatch = useDispatch();

  const isCompleted = subVision.status === "completed";
  const isInProgress = subVision.status === "in-progress";

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this milestone?")) {
      try {
        await dispatch(
          removeSubVision({ visionId, subId: subVision._id }),
        ).unwrap();
        dispatch(fetchVisionById(visionId));
        toast.success("Milestone removed");
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div className="group relative p-4 rounded-xl border border-[#e6f4f3] dark:border-[#1a3b38] bg-white dark:bg-white/5 hover:border-primary-400 dark:hover:border-primary-400/50 transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="flex items-start gap-4">
        {/* Status Icon/Checkbox */}
        <div
          className={`mt-1 flex-shrink-0 size-6 rounded-lg flex items-center justify-center transition-colors ${
            isCompleted
              ? "bg-primary-400 text-white"
              : "border-2 border-primary-400/30 text-primary-400"
          }`}
        >
          {isCompleted ? (
            <span className="material-symbols-outlined text-[16px] font-bold">
              check
            </span>
          ) : isInProgress ? (
            <div className="size-2 bg-primary-400 rounded-full animate-pulse"></div>
          ) : null}
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <Link to={`/visions/${visionId}/subvision/${subVision._id}`}>
              <p
                className={`text-sm font-bold truncate transition-colors ${
                  isCompleted
                    ? "text-slate-400 line-through decoration-primary-400/30"
                    : "text-[#0d1c1b] dark:text-white"
                }`}
              >
                {subVision.title}
              </p>
            </Link>

            {/* Hover Actions (Hidden until hover) */}
            <div className="flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
              <Link
                to={`/visions/${visionId}/subvision/${subVision._id}/edit`}
                className="p-1 text-slate-400 hover:text-primary-400 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="material-symbols-outlined text-[18px]">
                  edit
                </span>
              </Link>
              <button
                onClick={handleDelete}
                className="p-1 text-slate-400 hover:text-red-500 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  delete
                </span>
              </button>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="mt-3 flex flex-col gap-1.5">
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${
                  isCompleted ? "bg-primary-400" : "bg-primary-400/60"
                }`}
                style={{
                  width: `${subVision.progress || (isCompleted ? 100 : 0)}%`,
                }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-[10px] text-[#479e97] font-medium italic">
                {isCompleted
                  ? "Completed"
                  : isInProgress
                    ? `${subVision.progress}% Done`
                    : "Pending"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubVisionItem;
