import { useDailyInspiration } from "./useDailyInspiration";

const RightColumn = () => {
  const { scripture, prompt } = useDailyInspiration();

  if (!scripture || !prompt)
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <p>Loading daily inspiration...</p>
      </div>
    );

  return (
    <div className="md:col-span-2 space-y-6">
      {/* Scripture */}
      <div className="bg-gradient-to-br from-orange-100 to-yellow-200 p-6 rounded-xl shadow-sm">
        <h2 className="font-bold text-gray-800 mb-2">Daily Scripture:</h2>
        <p className="text-gray-700 leading-relaxed">{scripture.text}</p>
        <p className="text-sm text-gray-500">
          — {scripture.book} {scripture.chapter}:{scripture.verse}
        </p>
      </div>

      {/* Search + Streak */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center space-x-3">
          <span className="text-orange-500 text-3xl">🔥</span>
          <div>
            <p className="font-semibold text-gray-700">7-Day Streak</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <input
            type="text"
            placeholder="Search all entries"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>
      </div>

      {/* Daily Prompt */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="font-semibold text-gray-700 mb-2">Daily Prompt</h2>
        <p className="text-gray-600">{prompt.prompt}</p>
        {prompt.author && (
          <p className="text-sm mt-2 text-gray-500">— {prompt.author}</p>
        )}
      </div>

      {/* Footer Sync Notice */}
      <div className="flex justify-end items-center space-x-2 text-sm mt-4">
        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        <p className="text-gray-500">Offline Sync: All changes saved</p>
      </div>
    </div>
  );
};

export default RightColumn;
