import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchJournalById } from "../../features/JournalSlice";

const SingleJournalPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedJournal, status, error } = useSelector(
    (state) => state.journal
  );

  useEffect(() => {
    dispatch(fetchJournalById(id));
  }, [dispatch, id]);

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!selectedJournal) return <p>No journal found.</p>;

  return (
    <div className="bg-red p-6 rounded-lg shadow-sm">
      <h2 className="text-3xl font-bold mb-2">{selectedJournal.title}</h2>
      <p className="text-gray-500 text-sm mb-6">
        {new Date(selectedJournal.createdAt).toLocaleDateString()}
      </p>

      <p className="text-gray-800 whitespace-pre-line">
        {selectedJournal.content}
      </p>

      <div className="mt-6 flex gap-4">
        <Link to={`/journal/${id}/edit`} className="text-indigo-600 underline">
          Edit
        </Link>

        <Link to="/journal" className="text-gray-600 underline">
          Back to Journals
        </Link>
      </div>
    </div>
  );
};

export default SingleJournalPage;
