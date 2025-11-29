import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchJournals } from "../features/JournalSlice";
import JournalEntryCard from "../components/JournalComponents/JournalEntryCard";

import logo from "../assets/logo/quillpad_logo4.png";

const JournalPage = () => {
  const dispatch = useDispatch();
  const { entries, status, error } = useSelector((state) => state.journal);

  useEffect(() => {
    dispatch(fetchJournals());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex ">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-10 md:h-12 md:w-12 object-contain "
          />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 ">
            My Journals
          </h2>
        </div>

        <Link
          to="/journal/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          New Entry
        </Link>
      </div>

      {status === "loading" && <p>Loading entries...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
