import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const EntryDetailPage = () => {
  const { id } = useParams();
  const entries = useSelector((state) => state.journal.entries); // assumes `entries` is the array of posts
  const entry = entries.find((entry) => entry._id === id);

  if (!entry) {
    return (
      <div className="text-center text-gray-600 mt-10">
        Entry not found. Try going back to your journal.
      </div>
    );
  }

  const { title, content, createdAt } = entry;

  return (
    <div className="min-h-screen bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-indigo-100 shadow-2xl rounded-lg overflow-hidden border-2 border-indigo-300">
        <div className="absolute left-0 h-full w-2 bg-indigo-800 rounded-l-lg"></div>

        <div className="p-8 sm:p-12 md:p-16 relative">
          <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-l from-indigo-200 to-transparent"></div>

          <div className="flex justify-between items-start mb-8 border-b-2 border-indigo-200 pb-4">
            <div>
              <h2 className="text-3xl font-serif font-bold text-indigo-900 mb-1">
                {title}
              </h2>
              <p className="text-sm font-serif text-indigo-700 italic">
                {new Date(createdAt).toDateString()}
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                to={`/journal/${id}/edit`}
                className="text-indigo-700 hover:text-indigo-900 font-serif"
              >
                Edit
              </Link>
              <button className="text-indigo-700 hover:text-indigo-900 font-serif">
                Delete
              </button>
            </div>
          </div>

          <div className="font-serif text-indigo-900 text-lg leading-relaxed space-y-4 whitespace-pre-line">
            {content}
          </div>

          {/* <div className="mt-12 text-center text-indigo-700 text-sm">
            • {id} •
          </div> */}
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
