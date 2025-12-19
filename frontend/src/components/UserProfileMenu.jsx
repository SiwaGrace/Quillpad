import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../api/auth";
import avatar from "../assets/logo/quillpad_logo1.png";

const UserProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const toggleMenu = () => setOpen(!open);

  const handleLogOut = async () => {
    try {
      await logoutUser();
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  if (!user) return null;
  return (
    <div className="relative inline-block text-left">
      {/* Profile Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 hover:opacity-80 transition"
      >
        <img
          src={user?.avatar || avatar}
          alt={user?.username || "User"}
          className="w-9 h-9 rounded-full border border-teal-200 object-cover cursor-pointer"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = avatar; // fallback if remote fails
          }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 border border-sky-100"
          onMouseLeave={() => setOpen(false)}
        >
          <div className="px-4 py-3 border-b border-amber-600">
            <p className="text-sm font-semibold uppercase">
              {user?.username || "User"}
            </p>
            <p className="text-xs text-gray-500">
              {user?.email || "email@example.com"}
            </p>
          </div>

          <ul className="py-1">
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Edit Profile
              </Link>
            </li>

            <li>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogOut}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfileMenu;
