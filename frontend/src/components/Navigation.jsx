import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation(); // Get current route path

  // Helper to check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          Quillpad
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/journal"
            className={`font-bold px-2 py-1 ${
              isActive("/journal")
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-700 hover:text-indigo-600"
            }`}
          >
            My Journal
          </Link>

          <Link
            to="/logout"
            className={`font-bold px-2 py-1 ${
              isActive("/logout")
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-700 hover:text-indigo-600"
            }`}
          >
            LogOut
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
