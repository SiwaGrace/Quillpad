import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editJournal, fetchJournalById } from "../../features/JournalSlice";

const EditEntryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedJournal, status } = useSelector((state) => state.journal);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(fetchJournalById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedJournal) {
      setTitle(selectedJournal.title);
      setContent(selectedJournal.content);
    }
  }, [selectedJournal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const entryData = { title, content };

    await dispatch(editJournal({ id, updatedJournal: entryData }));
    navigate("/journal");
  };

  if (!selectedJournal) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Journal Entry
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditEntryPage;
