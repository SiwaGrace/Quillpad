import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeJournal } from "../../features/JournalSlice";
import {
  PiTrashLight,
  PiPencilSimpleLineLight,
  PiEyeLight,
} from "react-icons/pi";

const JournalEntryCard = ({ id, title, date, excerpt }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      dispatch(removeJournal(id));
    }
  };

  return (
    <div className="border border-primary-400 hover:bg-teal-50 p-4 rounded-lg shadow-sm bg-white">
      <h3 className="text-xl font-semibold truncate text-primary-500 w-full">
        {title}
      </h3>
      <p className="text-gray-500 text-sm mb-2">{date}</p>
      {/* line-clamp-3 or truncate */}
      <p className="text-gray-700  mb-4  line-clamp-3">{excerpt}</p>

      <div className="flex gap-3">
        {/* View */}
        <div className="relative group">
          <Link
            to={`/journal/${id}`}
            className="text-indigo-600 hover:text-indigo-700"
          >
            <PiEyeLight size={20} />
          </Link>
          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            View
          </span>
        </div>

        {/* Edit */}
        <div className="relative group">
          <Link
            to={`/journal/${id}/edit`}
            className="text-green-600 hover:text-green-700"
          >
            <PiPencilSimpleLineLight size={20} />
          </Link>
          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Edit
          </span>
        </div>

        {/* Delete */}
        <div className="relative group">
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 transition-colors duration-150 cursor-pointer"
          >
            <PiTrashLight size={20} />
          </button>
          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default JournalEntryCard;
