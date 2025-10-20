import { Link } from "react-router-dom";

const AuthForm = ({
  title,
  buttonText,
  footerText,
  footerLink,
  footerLinkText,
}) => {
  return (
    //  bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
          {title}
        </h2>

        <form className="space-y-6">
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md"
          >
            {buttonText}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {footerText}{" "}
          <Link
            to={footerLink}
            className="text-indigo-600 font-semibold hover:underline"
          >
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
