import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getMe } from "../api/auth";

const AuthForm = ({
  title,
  buttonText,
  footerText,
  footerLink,
  footerLinkText,
  authUser,
  token,
  // getMe,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authUser(formData);
      setMessage("Registration/login successful! 🎉");
      console.log("Registered:", res.data);
      // localStorage.setItem("token", res.data.token);

      // ✅ Fetch user details immediately after login/register
      // const userRes = await getMe();
      // console.log("Current user:", userRes.data);

      navigate("/home");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    //  bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
          {title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              User Name
            </label>
            <input
              type="username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* email */}
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* password */}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md cursor-pointer"
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
        {message && <p className="text-center mt-2 text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default AuthForm;
