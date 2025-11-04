import hero from "../assets/hero.png";
import { Link } from "react-router-dom";
import { getMe } from "../api/auth";
import { useEffect, useState } from "react";
import SplashScreen from "../components/Homepage/SplashScreen";
import MultiColorSpinner from "../components/Homepage/MultiColorSpinner";

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        console.log(res.data.user);
        setUser(res.data.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);
  // Splash screen while loading
  if (!user)
    return (
      // <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-50">
      //   <div className="flex items-center space-x-3">
      //     <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      //     <span className="text-xl font-semibold text-indigo-600">
      //       Loading your journal...
      //     </span>
      //   </div>
      // </div>
      // <SplashScreen message="Loading your journal..." />
      <MultiColorSpinner />
    );
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Capture Your Thoughts {user.username} <br /> with{" "}
            <span className="text-indigo-600">Clarity</span>.
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto lg:mx-0">
            Quillpad is your personal journal, designed to help you reflect,
            grow, and document your life — one entry at a time.
          </p>
          <p>your email is {user.email}</p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link
              to="/journal"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 text-center transition-colors"
            >
              Open Journal
            </Link>
            <Link
              to="/about"
              className="text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 text-center transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <img
            src={hero}
            alt="Journal writing illustration"
            className="max-w-full h-auto drop-shadow-xl"
            style={{ maxHeight: "450px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
