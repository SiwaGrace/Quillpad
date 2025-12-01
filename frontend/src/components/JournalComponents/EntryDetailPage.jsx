import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeJournal, fetchJournalById } from "../../features/JournalSlice";
import { useEffect } from "react";

const EntryDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const entries = useSelector((state) => state.journal.entries);
  const currentEntry = useSelector((state) => state.journal.currentEntry);
  const status = useSelector((state) => state.journal.status);

  // Use entry from entries array if available, otherwise use currentEntry
  const entry = entries.find((entry) => entry._id === id) || currentEntry;

  // Fetch entry if it's missing
  useEffect(() => {
    if (!entry) {
      dispatch(fetchJournalById(id));
    }
  }, [dispatch, id, entry]);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this journal?"
    );
    if (!confirmDelete) return;

    dispatch(removeJournal(id)).then(() => {
      navigate("/journal"); // redirect after deletion
    });
  };

  if (!entry || status === "loading") {
    return (
      <div className="text-center text-gray-600 mt-10">Loading entry... </div>
    );
  }

  const { title, content, createdAt } = entry;

  return (
    <div className="min-h-screen bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      {" "}
      <div className="max-w-3xl mx-auto bg-indigo-100 shadow-2xl rounded-lg overflow-hidden border-2 border-indigo-300">
        {" "}
        {/* <div className="absolute left-0 h-full w-2 bg-indigo-800 rounded-l-lg"></div> */}
        <div className="p-8 sm:p-12 md:p-16 relative">
          {/* <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-l from-indigo-200 to-transparent"></div> */}

          <div className="flex justify-between  items-center space-x-5 mb-8 border-b-2 border-indigo-200 pb-4">
            <div className="bg-amber-300">
              <h2 className="text-3xl font-serif font-bold text-indigo-900 mb-1">
                {title}
              </h2>
              <p className="text-sm font-serif text-indigo-700 italic">
                {new Date(createdAt).toDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-3 bg-amber-700">
              <Link
                to={`/journal/${id}/edit`}
                className="text-indigo-700 hover:text-indigo-900 font-serif"
              >
                Edit
              </Link>
              <button
                className="text-indigo-700 hover:text-indigo-900 font-serif"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="font-serif text-indigo-900 text-lg leading-relaxed space-y-4 whitespace-pre-line">
            {content}
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto flex justify-between mt-8">
        <button className="font-serif text-indigo-700 hover:text-indigo-900 flex items-center">
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous Entry
        </button>
        <button className="font-serif text-indigo-700 hover:text-indigo-900 flex items-center">
          Next Entry
          <svg
            className="w-5 h-5 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EntryDetailPage;
