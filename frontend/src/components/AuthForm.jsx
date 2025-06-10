import { Link } from "react-router-dom";

// AuthForm.jsx (Reusable Component)
const AuthForm = ({
  title,
  buttonText,
  footerText,
  footerLink,
  footerLinkText,
}) => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {buttonText}
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        {footerText}{" "}
        <Link to={footerLink} className="text-indigo-600 hover:underline">
          {footerLinkText}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
