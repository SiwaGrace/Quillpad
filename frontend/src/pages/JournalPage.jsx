import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchJournals } from "../features/JournalSlice";
import JournalEntryCard from "../components/JournalComponents/JournalEntryCard";

import logo from "../assets/logo/quillpad_logo4.png";
import { FaPlus } from "react-icons/fa";
import { GoSearch } from "react-icons/go";

const JournalPage = () => {
  const dispatch = useDispatch();
  // const { id: visionId } = useParams();
  const { entries, status, error } = useSelector((state) => state.journal);

  useEffect(() => {
    dispatch(fetchJournals());
  }, [dispatch]);

  return (
    <div className="md:max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8 ">
        <div className="flex ">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 ">
            My Journals
          </h2>
        </div>

        <Link
          to="/journal/new"
          className="bg-primary-400 text-black px-4 py-2 rounded-md hover:bg-primary-500 flex items-center space-x-2"
        >
          <FaPlus />
          <p>New Entry</p>
        </Link>
      </div>
      {/* <!-- SearchBar --> */}
      <div className="relative group mb-12">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <GoSearch className="group-focus-within:text-primary-400" />
        </div>
        <input
          className="w-full h-14 pl-12 pr-4 bg-white dark:bg-slate-800/50 border-none rounded-xl font-sans text-base focus:ring-2 outline-none focus:ring-primary-400 shadow-sm"
          placeholder="Search your thoughts..."
          type="text"
        />
      </div>

      {status === "loading" && <p>Loading entries...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="flex flex-col gap-6">
        {/* Only show entries OR 'No entries' if we are NOT loading and there is no error */}
        {status !== "loading" && !error && (
          <>
            {entries?.length > 0 ? (
              entries.map((entry) => {
                const dateObj = new Date(entry.createdAt);
                const month = dateObj
                  .toLocaleDateString("en-US", { month: "short" })
                  .toUpperCase();
                const day = dateObj.getDate();
                return (
                  <JournalEntryCard
                    key={entry._id}
                    id={entry._id}
                    title={entry.title}
                    month={month}
                    day={day}
                    date={new Date(entry.createdAt)
                      .toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                      .toUpperCase()}
                    // excerpt={
                    //   entry.content.length > 100
                    //     ? entry.content.slice(0, 100) + "..."
                    //     : entry.content
                    // }
                    excerpt={
                      entry.content?.replace(/<[^>]*>/g, "").slice(0, 100) +
                      "..."
                    }
                    visionLinked={!!entry.visionId}
                  />
                );
              })
            ) : (
              <p>No journal entries yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JournalPage;
