import { Link } from "react-router-dom";
import hero from "../assets/hero.png";
// add a pkt

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome to Quillpad
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A private space for your thoughts, reflections, and daily
            experiences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 text-center transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 text-center transition-colors"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <img
            src={hero}
            alt="Journal writing illustration"
            className="max-w-full h-auto"
            style={{ maxHeight: "400px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
