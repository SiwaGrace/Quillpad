import hero from "../assets/hero.png";
import { Link, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import SplashScreen from "../components/Dashboard/SplashScreen";

import logoLeaf from "../assets/logo/quillpad_logo2.png";
import random from "../assets/logo/quillpad_logo2.png";

import LeftColumn from "../components/Dashboard/LeftColumn";
import RightColumn from "../components/Dashboard/RightColumn";

const progressImages = [random, random];

const Dashboard = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (!user)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <SplashScreen />
      </div>
    );

  return (
    <div className="w-full min-h-screen p-6 flex justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <LeftColumn
          logoLeaf={logoLeaf}
          progressImages={progressImages}
          progressPercent={75}
        />

        {/* RIGHT COLUMN */}
        <RightColumn />
      </div>
    </div>
  );
};

export default Dashboard;
