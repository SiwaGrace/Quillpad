import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearAuthError } from "../../features/authSlices";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { message, error, forgotPasswordLoading } = useSelector(
    (state) => state.auth,
  );

  const [localMessage, setLocalMessage] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    setLocalMessage(message || "");
    setLocalError(error || "");
  }, [message, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(forgotPassword(email)).unwrap();
      setEmail("");
    } catch (err) {
      // error already set in slice
    } finally {
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Toaster messages */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {localMessage && (
          <div className="bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slide-in">
            {localMessage}
          </div>
        )}
        {localError && (
          <div className="bg-red-500 text-white px-4 py-2 rounded shadow-lg animate-slide-in">
            {localError}
          </div>
        )}
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-4">
          Forgot Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email and we will send a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                dispatch(clearAuthError());
                setLocalError("");
              }}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={forgotPasswordLoading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center"
          >
            {forgotPasswordLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
