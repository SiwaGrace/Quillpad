import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  createJournal,
  fetchJournalById,
  editJournal,
} from "../../features/JournalSlice";
import { fetchVisions } from "../../features/VisionSlice";

const EntryFormPage = ({ isEdit = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // 1. Capture the context from where the user clicked "Add"
  const redirectTo = location.state?.redirectTo || "/journal";
  const incomingVisionId = location.state?.visionId || "";
  const incomingSubVisionId = location.state?.subVisionId || "";

  // Local State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedVision, setSelectedVision] = useState("");
  const [selectedSubVision, setSelectedSubVision] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { status, currentEntry } = useSelector((state) => state.journal);
  const visions = useSelector((state) => state.visions?.items || []);

  useEffect(() => {
    if (visions.length === 0) dispatch(fetchVisions());
    if (isEdit && id) dispatch(fetchJournalById(id));
  }, [dispatch, isEdit, id]);

  // 2. The Logic Bridge: Sets initial values but allows user changes
  useEffect(() => {
    if (isEdit && currentEntry) {
      // Edit Mode Sync
      setTitle(currentEntry.title);
      setContent(currentEntry.content);
      setSelectedVision(
        currentEntry.visionId?._id || currentEntry.visionId || "",
      );
      setSelectedSubVision(
        currentEntry.subVisionId?._id || currentEntry.subVisionId || "",
      );
    } else if (!isEdit) {
      // New Entry Sync: Auto-select based on navigation context
      if (incomingVisionId) setSelectedVision(incomingVisionId);
      if (incomingSubVisionId) setSelectedSubVision(incomingSubVisionId);
    }
  }, [isEdit, currentEntry, incomingVisionId, incomingSubVisionId]);

  // Derived data for the SubVision dropdown
  const activeVisionData = visions.find((v) => v._id === selectedVision);
  const availableSubVisions = activeVisionData?.subVisions || [];

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!title.trim()) return;

    setIsSaving(true);
    const entryData = {
      title,
      content,
      // Your controller logic: link to subvision or vision, never both simultaneously
      visionId: selectedSubVision ? null : selectedVision || null,
      subVisionId: selectedSubVision || null,
    };

    try {
      if (isEdit) {
        await dispatch(editJournal({ id, updatedJournal: entryData })).unwrap();
      } else {
        await dispatch(createJournal(entryData)).unwrap();
      }
      navigate(redirectTo);
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] dark:bg-[#0e1b19] transition-colors duration-500">
      {/* Immersive Header */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-[#0e1b19]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="text-[#50958f] p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              Status
            </span>
            <span className="text-xs font-bold text-[#50958f]">
              {isSaving ? "Syncing..." : "Ready"}
            </span>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="bg-[#4ce6d9] text-[#0e1b19] px-8 py-2.5 rounded-full font-black text-xs uppercase tracking-widest hover:shadow-xl hover:shadow-[#4ce6d9]/30 transition-all active:scale-95"
          >
            {isEdit ? "Update" : "Collect"}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto pt-32 pb-20 px-6">
        {/* Dynamic Context Selector */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          {/* Vision Pill */}
          <div
            className={`group flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 ${selectedVision ? "border-[#4ce6d9] bg-[#4ce6d9]/5" : "border-gray-200 dark:border-gray-700 hover:border-[#50958f]"}`}
          >
            <span
              className={`material-symbols-outlined text-xl ${selectedVision ? "text-[#4ce6d9]" : "text-gray-400"}`}
            >
              {selectedVision ? "target" : "adjust"}
            </span>
            <select
              value={selectedVision}
              onChange={(e) => {
                setSelectedVision(e.target.value);
                setSelectedSubVision("");
              }}
              className="bg-transparent border-none text-[11px] font-black uppercase tracking-[0.15em] text-gray-600 dark:text-gray-200 focus:ring-0 p-0 cursor-pointer appearance-none"
            >
              <option value="">General Journal</option>
              {visions.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.title}
                </option>
              ))}
            </select>
          </div>

          {/* SubVision Pill - Appears if Vision is selected AND has subvisions */}
          {availableSubVisions.length > 0 && (
            <div
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full border animate-in fade-in zoom-in-95 duration-300 ${selectedSubVision ? "border-[#4ce6d9] bg-[#4ce6d9]/5" : "border-gray-200 dark:border-gray-700"}`}
            >
              <span className="material-symbols-outlined text-lg text-[#50958f]">
                subdirectory_arrow_right
              </span>
              <select
                value={selectedSubVision}
                onChange={(e) => setSelectedSubVision(e.target.value)}
                className="bg-transparent border-none text-[11px] font-black uppercase tracking-[0.15em] text-gray-600 dark:text-gray-200 focus:ring-0 p-0 cursor-pointer appearance-none"
              >
                <option value="">Entire Vision</option>
                {availableSubVisions.map((sv) => (
                  <option key={sv._id} value={sv._id}>
                    {sv.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Writing Canvas */}
        <div className="flex flex-col gap-8">
          <input
            type="text"
            placeholder="Title of your thought..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="serif-text w-full text-5xl font-bold bg-transparent outline-none border-none focus:ring-0 placeholder:text-gray-200 dark:placeholder:text-gray-800 p-0 transition-all"
          />

          <textarea
            placeholder="Write your reflection here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="ruled-paper serif-text outline-none w-full text-xl leading-[2.5rem] bg-transparent border-none focus:ring-0 placeholder:text-gray-200 dark:placeholder:text-gray-800 p-0 min-h-[600px] resize-none"
          />
        </div>
      </main>

      <footer className="fixed bottom-8 right-10 select-none">
        <div className="flex items-center gap-3 text-gray-300 dark:text-gray-700">
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">
            Words
          </span>
          <span className="text-2xl font-serif italic">
            {content.trim() ? content.trim().split(/\s+/).length : 0}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default EntryFormPage;
