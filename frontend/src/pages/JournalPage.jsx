import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchJournals } from "../features/JournalSlice";
import JournalEntryCard from "../components/JournalComponents/JournalEntryCard";

import logo from "../assets/logo/quillpad_logo4.png";
import { FaPlus } from "react-icons/fa";
import { MdHistoryEdu } from "react-icons/md";

import SearchBar from "../components/SearchBar";
import { useState } from "react";

const JournalPage = () => {
  const dispatch = useDispatch();
  const { entries, status, error } = useSelector((state) => state.journal);

  const [searchQuery, setSearchQuery] = useState("");

  // search
  const filteredEntries = entries?.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
          className="bg-primary-400 text-white px-4 py-2 rounded-md hover:bg-primary-500 flex items-center space-x-2"
        >
          <FaPlus />
          <p>New Entry</p>
        </Link>
      </div>
      {/* <!-- SearchBar --> */}
      <div className="mb-12">
        <SearchBar
          onSearch={(val) => setSearchQuery(val)}
          placeholder="Search your journals..."
        />
      </div>

      {status === "loading" && (
        <div className="text-center py-12">
          <p className="text-xl text-teal-600">Loading Journals...</p>
        </div>
      )}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="flex flex-col gap-6">
        {/* Only show filteredEntries OR 'No filteredEntries' if we are NOT loading and there is no error */}
        {status !== "loading" && !error && (
          <>
            {filteredEntries?.length > 0 ? (
              filteredEntries.map((entry) => {
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
              <div className="p-10 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                <MdHistoryEdu className="mx-auto text-gray-300 dark:text-gray-700 text-4xl mb-2" />
                <p className="text-gray-500 dark:text-gray-400">
                  No entries found. Your journey is waiting to be written.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JournalPage;
