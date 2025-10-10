import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postEntries } from "../features/JournalSlice";

const EntryFormPage = ({ isEdit = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [localError, setLocalError] = useState(null);

  const { status } = useSelector((state) => state.journal);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const entryData = {
      title,
      content,
    };

    try {
      await dispatch(postEntries(entryData)).unwrap(); // wait for success
      navigate("/journal"); // redirect to journal listing
    } catch (err) {
      setLocalError(err); // show error
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEdit ? "Edit Journal Entry" : "New Journal Entry"}
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="content">
            Your Thoughts
          </label>
          <textarea
            id="content"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={status === "loading"}
        >
          {isEdit
            ? "Update Entry"
            : status === "loading"
            ? "Saving..."
            : "Save Entry"}
        </button>

        {localError && <p className="text-red-500 mt-2">Error: {localError}</p>}
      </form>
    </div>
  );
};

const NewEntryPage = () => <EntryFormPage />;
const EditEntryPage = () => <EntryFormPage isEdit={true} />;

export default NewEntryPage;
export { EditEntryPage };
