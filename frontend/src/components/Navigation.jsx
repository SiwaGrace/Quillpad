import { Link, useLocation } from "react-router-dom";
import UserProfileMenu from "./UserProfileMenu";
import logo from "../assets/logo/quillpad_logo.png";

import { MdRemoveRedEye, MdBook, MdDashboard } from "react-icons/md";

const Navigation = ({ onClose }) => {
  const location = useLocation();

  // Your navigation items
  const navLinks = [
    { label: "Dashboard", path: "/home", icon: <MdDashboard /> },
    { label: "My Visions", path: "/vision", icon: <MdRemoveRedEye /> },
    { label: "My Journals", path: "/journal", icon: <MdBook /> },
  ];

  // Updated styling for vertical sidebar
  const linkClasses = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
      location.pathname === path
        ? "bg-primary/10 text-primary border-l-4 border-primary"
        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between px-2">
          <Link to="/home" onClick={onClose}>
            <img src={logo} alt="logo" className="w-20" />
          </Link>
          {/* Show close button ONLY if onClose exists (Mobile) */}
          {onClose && (
            <button onClick={onClose} className="md:hidden p-2">
              ✕
            </button>
          )}
        </div>

        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={linkClasses(link.path)}
              onClick={onClose} // Close sidebar on mobile when link is clicked
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span className="text-sm">{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
        <UserProfileMenu />
      </div>
    </div>
  );
};

export default Navigation;
