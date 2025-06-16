import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getEntries } from "../features/journalSlice"; // make sure this thunk is defined
import JournalEntryCard from "../components/JournalEntryCard";

const JournalPage = () => {
  const dispatch = useDispatch();
  const { entries, status, error } = useSelector((state) => state.journal);

  useEffect(() => {
    dispatch(getEntries());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">My Journal</h2>
        <Link
          to="/journal/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          New Entry
        </Link>
      </div>

      {status === "loading" && <p>Loading entries...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="space-y-4">
        {entries?.length > 0 ? (
          entries.map((entry) => (
            <JournalEntryCard
              key={entry._id}
              id={entry._id}
              title={entry.title}
              date={new Date(entry.createdAt).toLocaleDateString()}
              excerpt={
                entry.content.length > 100
                  ? entry.content.slice(0, 100) + "..."
                  : entry.content
              }
            />
          ))
        ) : (
          <p>No journal entries yet.</p>
        )}
      </div>
    </div>
  );
};

export default JournalPage;
