import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AuthForm = ({
  title,
  buttonText,
  footerText,
  footerLink,
  footerLinkText,
  authAction, // 🔥 redux thunk passed from page
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // for checkbox?
  // const handleChange = (e) => {
  //   const { name, type, value, checked } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: type === "checkbox" ? checked : value,
  //   });
  // };

  // 🔥 Handle form submit with Redux thunk
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(authAction(formData));
  };

  // 🔥 Navigate after successful login/register
  useEffect(() => {
    if (user && !loading && !error) {
      navigate("/home");
    }
  }, [user, loading, error, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
          {title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center">
            <label className="flex items-center text-gray-700 text-sm">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rememberMe: e.target.checked,
                  })
                }
                className="mr-2 h-4 w-4"
              />
              Remember Me
            </label>

            {buttonText.toLowerCase() === "login" && (
              <Link
                to="/forgotpass"
                className="text-sm text-indigo-600 font-semibold hover:underline"
              >
                Forgot your password?
              </Link>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md cursor-pointer"
          >
            {loading ? "Please wait..." : buttonText}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-600">
          {footerText}{" "}
          <Link
            to={footerLink}
            className="text-indigo-600 font-semibold hover:underline"
          >
            {footerLinkText}
          </Link>
        </p>

        {/* Error */}
        {error && (
          <p className="text-center mt-2 text-sm text-red-600 font-medium">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
