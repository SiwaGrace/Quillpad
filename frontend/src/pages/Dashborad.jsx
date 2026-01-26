import hero from "../assets/hero.png";
import { Link, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import SplashScreen from "../components/Dashboard/SplashScreen";

import logoLeaf from "../assets/logo/quillpad_logo2.png";
import random from "../assets/logo/quillpad_logo2.png";

import VisionsDataEntries from "../components/Dashboard/VisionsDataEntries";
import QuoteScriptures from "../components/Dashboard/QuoteScriptures";
import JournalsDataEntries from "../components/Dashboard/JournalsDataEntries";

const Dashboard = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (!user)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <SplashScreen />
      </div>
    );

  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark scroll-smooth">
      <header className="mb-12 flex justify-between">
        <div>
          <h2 className="serif-text text-4xl font-bold mb-2 text-[#0e1b19] dark:text-white">
            Good evening, {user.username}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-display">
            Keep showing up for your future self
          </p>
        </div>
        <Link to="/createvision" state={{ from: location.pathname }}>
          <button className="bg-linear-to-b from-primary-400 to-primary-600 text-white font-semibold px-6 py-2 rounded-full shadow hover:opacity-90 transition flex items-center justify-between cursor-pointer">
            <img src={logoLeaf} alt="logo" className="h-7" />
            <p>New Entry</p>
          </button>
        </Link>
      </header>
      <QuoteScriptures />
      {/* Visions Section */}
      <VisionsDataEntries logoLeaf={logoLeaf} />

      {/* Entries Section */}
      <JournalsDataEntries />
    </div>
  );
};

export default Dashboard;
