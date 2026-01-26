import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../api/auth";
import avatarFallback from "../assets/logo/quillpad_logo1.png";
import {
  MdOutlinePerson,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";

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
        className="flex items-center group transition-all"
      >
        <img
          src={user?.avatar || avatarFallback}
          alt={user?.username || "User"}
          className="w-10 h-10 rounded-full border-2 border-primary-400/50 group-hover:border-primary object-cover cursor-pointer transition-all"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = avatarFallback;
          }}
        />
      </button>

      {/* Dropdown - Adjusted for Sidebar position */}
      {open && (
        <>
          {/* Overlay to close when clicking elsewhere */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />

          <div className="absolute bottom-12 left-0 w-56 bg-white dark:bg-[#1a2e2c] rounded-xl shadow-xl z-20 border border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <p className="text-sm font-bold text-[#0e1b19] dark:text-white truncate">
                {user?.username || "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email || "email@example.com"}
              </p>
            </div>

            <nav className="p-1">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <MdOutlinePerson />
                Edit Profile
              </Link>

              <Link
                to="/settings"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <MdOutlineSettings />
                Settings
              </Link>

              <div className="h-px bg-gray-100 dark:border-gray-800 my-1" />

              <button
                onClick={handleLogOut}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <MdOutlineLogout />
                Logout
              </button>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfileMenu;
