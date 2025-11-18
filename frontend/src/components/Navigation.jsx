import { Link, useLocation } from "react-router-dom";
import UserProfileMenu from "./UserProfileMenu";
import logo from "../assets/logo/quillpad_logo.png";

const Navigation = ({ user }) => {
  const location = useLocation();

  // Your navigation items
  const navLinks = [
    { label: "My Journal", path: "/journal" },
    { label: "My Vision", path: "/vision" },
    // you can add more links any time
  ];

  // Reusable function for styling links
  const linkClasses = (path) =>
    `font-bold py-1 transition ${
      location.pathname === path
        ? "border-b-2 border-indigo-600 text-indigo-600"
        : "text-gray-700 hover:text-indigo-600"
    }`;

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/home">
          <img src={logo} alt="quillpad logo" className="w-10 p-0" />
        </Link>

        {/* Nav Links */}
        <div className="flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={linkClasses(link.path)}
            >
              {link.label}
            </Link>
          ))}

          {/* Profile Dropdown */}
          <UserProfileMenu user={user} />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
