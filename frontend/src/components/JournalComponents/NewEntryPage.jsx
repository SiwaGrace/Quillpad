import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createJournal,
  fetchJournalById,
  editJournal,
} from "../../features/JournalSlice";
import { fetchVisions } from "../../features/VisionSlice";

const EntryFormPage = ({ isEdit = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // journal id for editing

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedVision, setSelectedVision] = useState("");
  const [selectedSubVision, setSelectedSubVision] = useState("");
  const [localError, setLocalError] = useState(null);

  const { status, currentEntry } = useSelector((state) => state.journal);
  const visions = useSelector((state) => state.visions?.items || []);

  useEffect(() => {
    if (visions.length === 0) dispatch(fetchVisions());
  }, [dispatch, visions.length]);

  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchJournalById(id));
    }
  }, [dispatch, isEdit, id]);

  useEffect(() => {
    if (isEdit && currentEntry) {
      setTitle(currentEntry.title);
      setContent(currentEntry.content);
      setSelectedVision(currentEntry.visionId || "");
      setSelectedSubVision(currentEntry.subVisionId || "");
    }
  }, [isEdit, currentEntry]);

  const currentVision = visions.find((v) => v._id === selectedVision);
  const subVisions = currentVision?.subVisions || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const entryData = {
      title,
      content,
      visionId: selectedVision || null,
      subVisionId: selectedSubVision || null,
    };

    try {
      if (isEdit) {
        await dispatch(editJournal({ id, data: entryData })).unwrap();
      } else {
        await dispatch(createJournal(entryData)).unwrap();
      }
      navigate("/journal");
    } catch (err) {
      setLocalError(err);
    }
  };

  if (isEdit && status === "loading") return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEdit ? "Edit Journal Entry" : "New Journal Entry"}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 mb-2">
            Your Thoughts
          </label>
          <textarea
            id="content"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Vision */}
        <div className="mb-4">
          <label htmlFor="vision" className="block text-gray-700 mb-2">
            Choose Vision (optional)
          </label>
          <select
            id="vision"
            value={selectedVision}
            onChange={(e) => {
              setSelectedVision(e.target.value);
              setSelectedSubVision("");
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- None --</option>
            {visions.map((v) => (
              <option key={v._id} value={v._id}>
                {v.title}
              </option>
            ))}
          </select>
        </div>

        {/* SubVision */}
        {subVisions.length > 0 && (
          <div className="mb-4">
            <label htmlFor="subvision" className="block text-gray-700 mb-2">
              Choose SubVision (optional)
            </label>
            <select
              id="subvision"
              value={selectedSubVision}
              onChange={(e) => setSelectedSubVision(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">-- None --</option>
              {subVisions.map((sv) => (
                <option key={sv._id} value={sv._id}>
                  {sv.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
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

export default EntryFormPage;
