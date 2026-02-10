import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearAuthError } from "../../features/authSlices";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, error, resetPasswordLoading } = useSelector(
    (state) => state.auth,
  );
  const [password, setPassword] = useState("");
  const [localMessage, setLocalMessage] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    setLocalMessage(message || "");
    setLocalError(error || "");
  }, [message, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(resetPassword({ token, newPassword: password })).unwrap();
      setPassword("");
      setTimeout(() => navigate("/login"), 1000); // redirect to login after 1s
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
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                dispatch(clearAuthError());
                setLocalError("");
              }}
              placeholder="Enter new password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={resetPasswordLoading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center"
          >
            {resetPasswordLoading ? (
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
              "Reset Password"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Back to{" "}
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

export default ResetPassword;
