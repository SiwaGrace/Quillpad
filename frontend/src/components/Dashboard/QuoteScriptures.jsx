import { useDailyInspiration } from "./useDailyInspiration";
import { RiDoubleQuotesR } from "react-icons/ri";

const QuoteScriptures = () => {
  const { scripture, prompt } = useDailyInspiration();

  if (!scripture || !prompt)
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <p>Loading daily inspiration...</p>
      </div>
    );

  return (
    <div>
      {/* Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-3 p-8 rounded-xl bg-white dark:bg-[#1a2e2c] shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-center min-h-[220px]">
          <RiDoubleQuotesR className="text-primary-400 w-10 h-10 " />
          <blockquote className="serif-text text-2xl leading-relaxed text-[#0e1b19] dark:text-gray-100 italic mb-4">
            {prompt.prompt}
          </blockquote>
          <cite className="text-gray-500 dark:text-gray-400 font-display not-italic">
            —{" "}
            {prompt.author && (
              <p className="text-sm mt-2 text-gray-500">— {prompt.author}</p>
            )}
          </cite>
        </div>
        {/* streak */}
        {/* <div className="p-8 rounded-xl bg-white dark:bg-[#1a2e2c] shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center">
          <div className="relative size-32 mb-4 flex items-center justify-center">
            <svg className="size-full -rotate-90" viewBox="0 0 36 36">
              <circle
                className="stroke-gray-100 dark:stroke-gray-800"
                cx="18"
                cy="18"
                fill="none"
                r="16"
                strokeWidth="3"
              ></circle>
              <circle
                className="stroke-primary-400"
                cx="18"
                cy="18"
                fill="none"
                r="16"
                strokeDasharray="100"
                strokeDashoffset="30"
                strokeLinecap="round"
                strokeWidth="3"
              ></circle>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold font-display">7</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400">
                Days
              </span>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-1">7 Day Streak</h3>
          <p className="text-sm text-primary-400 font-medium">
            You're building a habit
          </p>
        </div> */}
      </div>
      {/* Scripture */}
      <div className="bg-gradient-to-br from-[#c7f0ec]  to-[#04fae1]  p-6 rounded-xl shadow-sm mb-12">
        <h2 className="font-bold text-gray-800 mb-2">Daily Scripture:</h2>
        <p className="text-gray-700 leading-relaxed">{scripture.text}</p>
        <p className="text-sm text-gray-500">
          — {scripture.book} {scripture.chapter}:{scripture.verse}
        </p>
      </div>

      {/* Footer Sync Notice */}
      {/* <div className="flex justify-end items-center space-x-2 text-sm mt-4">
        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        <p className="text-gray-500">Offline Sync: All changes saved</p>
      </div> */}
    </div>
  );
};

export default QuoteScriptures;
