import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJournalById, editJournal } from "../../features/JournalSlice";
import { debounce } from "lodash";
import { fetchVisions } from "../../features/VisionSlice";

const JournalDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux State
  const { currentEntry, status } = useSelector((state) => state.journal);
  const { items: visions } = useSelector((state) => state.visions);

  // Local UI State
  const [showVisionMenu, setShowVisionMenu] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // 1. Initial Data Fetching
  useEffect(() => {
    dispatch(fetchJournalById(id));
    if (visions.length === 0) dispatch(fetchVisions());
  }, [dispatch, id]);

  // 2. Sync local state when Redux data loads
  useEffect(() => {
    if (currentEntry) {
      setTitle(currentEntry.title);
      setContent(currentEntry.content);
    }
  }, [currentEntry]);

  // 3. The "Vision Link" Logic
  const linkedVision = visions.find((v) => v._id === currentEntry?.visionId);

  const handleVisionSelect = async (visionId) => {
    try {
      setIsSaving(true);

      await dispatch(
        editJournal({
          id,
          updatedJournal: { title, content, visionId },
        }),
      );
    } catch (error) {
      console.error("Failed to update journal:", error);
    } finally {
      setIsSaving(false);
      setShowVisionMenu(false);
    }
  };

  // 4. Debounced Text Auto-save
  const debouncedSave = useCallback(
    debounce((nextTitle, nextContent) => {
      setIsSaving(true);
      const currentVisionId = currentEntry?.visionId;
      dispatch(
        editJournal({
          id,
          updatedJournal: {
            title: nextTitle,
            content: nextContent,
            visionId: currentEntry?.visionId,
          },
        }),
      ).finally(() => setIsSaving(false));
    }, 1500),
    [id, dispatch, currentEntry?.visionId],
  );

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    debouncedSave(e.target.value, content);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    debouncedSave(title, e.target.value);
  };

  if (!currentEntry && status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-[#11211f]">
        <div className="text-[#50958f] animate-pulse font-medium">
          Opening your journal...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8f8] dark:bg-[#11211f] text-[#0e1b19] dark:text-gray-100 flex flex-col transition-colors duration-300">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#f6f8f8]/80 dark:bg-[#11211f]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div
          onClick={() => navigate("/journal")}
          className="flex items-center gap-2 group cursor-pointer text-[#50958f]"
        >
          <span className="material-symbols-outlined">chevron_left</span>
          <span className="text-sm font-medium group-hover:text-[#0e1b19] dark:group-hover:text-white transition-colors">
            Journal
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[#50958f] text-sm">
            <span
              className={`material-symbols-outlined text-sm ${isSaving ? "animate-spin" : ""}`}
            >
              {isSaving ? "sync" : "check_circle"}
            </span>
            <span>{isSaving ? "Saving..." : "Saved"}</span>
          </div>
          <button
            onClick={() => navigate("/journal")}
            className="rounded-full h-10 px-6 bg-[#4ce6d9] text-[#0e1b19] text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Done
          </button>
        </div>
      </header>

      {/* Writing Canvas */}
      <main className="flex-1 flex justify-center py-12 md:py-20 px-6 overflow-y-auto">
        <div className="max-w-[800px] w-full flex flex-col">
          <p className="text-[#50958f] text-xs font-bold tracking-[0.2em] mb-4 uppercase">
            {currentEntry?.createdAt &&
              new Date(currentEntry.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
          </p>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
            className="serif-text w-full bg-transparent border-none outline-none focus:ring-0 text-4xl md:text-5xl font-bold p-0 mb-8 placeholder:opacity-30 transition-all"
          />
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Start writing..."
            className="ruled-paper serif-text w-full bg-transparent outline-none border-none focus:ring-0 text-lg md:text-xl p-0 resize-none min-h-[600px] placeholder:opacity-30"
          />
          <div className="h-32" /> {/* Bottom Spacer */}
        </div>
      </main>

      {/* Floating Toolbar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="relative bg-white dark:bg-[#1a2e2c] shadow-2xl border border-gray-100 dark:border-gray-800 rounded-full flex items-center gap-1 p-2 px-3">
          <div className="flex items-center border-r border-gray-100 dark:border-gray-800 pr-2 mr-1">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-300">
              <span className="material-symbols-outlined text-xl">
                format_bold
              </span>
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-300">
              <span className="material-symbols-outlined text-xl">
                format_italic
              </span>
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowVisionMenu(!showVisionMenu)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all ${
                linkedVision
                  ? "bg-[#4ce6d9] text-[#0e1b19]"
                  : "bg-[#4ce6d9]/20 text-[#4ce6d9] hover:bg-[#4ce6d9]/30"
              }`}
            >
              <span className="material-symbols-outlined text-lg">
                {linkedVision ? "link" : "bookmark"}
              </span>
              <span className="text-sm font-semibold whitespace-nowrap">
                {linkedVision ? linkedVision.title : "Link Vision"}
              </span>
              <span className="material-symbols-outlined text-sm">
                {showVisionMenu ? "expand_less" : "expand_more"}
              </span>
            </button>

            {showVisionMenu && (
              <div className="absolute bottom-full mb-4 left-0 w-64 bg-white dark:bg-[#1a2e2c] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-bottom-2">
                <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Select a Vision
                </p>
                <div className="max-h-60 overflow-y-auto custom-scrollbar">
                  {visions.map((vision) => (
                    <button
                      key={vision._id}
                      onClick={() => handleVisionSelect(vision._id)}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-3"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${currentEntry?.visionId === vision._id ? "bg-[#4ce6d9]" : "bg-gray-300 dark:bg-gray-600"}`}
                      />
                      <span
                        className={
                          currentEntry?.visionId === vision._id
                            ? "font-bold"
                            : ""
                        }
                      >
                        {vision.title}
                      </span>
                    </button>
                  ))}

                  <button
                    onClick={() => handleVisionSelect(null)}
                    className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 border-t border-gray-100 dark:border-gray-800 mt-1"
                  >
                    Remove Link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalDetailPage;
