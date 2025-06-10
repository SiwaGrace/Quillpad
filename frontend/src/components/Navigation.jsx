import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          Quillpad
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/journal"
            className="text-gray-700 hover:text-indigo-600 font-bold"
          >
            My Journal
          </Link>
          <Link
            to="/login"
            className="text-gray-700 hover:text-indigo-600 font-bold"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-gray-700 hover:text-indigo-600 font-bold"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
