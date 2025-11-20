import hero from "../assets/hero.png";
import { Link, useOutletContext } from "react-router-dom";
import SplashScreen from "../components/Dashboard/SplashScreen";

import logoLeaf from "../assets/logo/quillpad_logo2.png";
import random from "../assets/logo/quillpad_logo2.png";
import { useDailyInspiration } from "../components/Dashboard/useDailyInspiration";

const Dashboard = () => {
  const { scripture, prompt } = useDailyInspiration();
  const { user } = useOutletContext();

  if (!user)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <SplashScreen />
      </div>
    );

  if (!scripture || !prompt)
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <p>Loading daily inspiration...</p>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Capture Vision */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <button className="bg-gradient-to-r from-sky-300 to-sky-400 text-white font-semibold px-6 py-2 rounded-full shadow hover:opacity-90 transition flex items-center justify-between">
              <img src={logoLeaf} alt="" className="h-10" />
              <p>Capture Vision</p>
            </button>
          </div>

          {/* Recent Entries */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-4">Recent Entries</h2>
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center space-x-4 mb-4">
                <img
                  src={random}
                  alt="entry"
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold">
                    {i === 1
                      ? "My Faith Journey"
                      : "Dreaming Big (Business Idea)"}
                  </p>
                  <p className="text-sm text-gray-500">Today, 10:30 AM</p>
                </div>
              </div>
            ))}
          </div>

          {/* Vision Board Progress */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-4">
              Vision Board Progress
            </h2>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full border-4 border-sky-400 flex items-center justify-center font-semibold text-sky-500">
                75%
              </div>
              <div className="flex space-x-2">
                <img
                  src={random}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <img
                  src={random}
                  className="w-14 h-14 rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
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
      </div>
    </div>
  );
};

export default Dashboard;
