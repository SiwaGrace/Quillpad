import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would call your API to send the reset link
    setMessage(
      `If an account exists for ${email}, a reset link has been sent.`
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-4">
          Forgot Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address below and we'll send you a link to reset your
          password.
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
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md cursor-pointer"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-green-600">{message}</p>
        )}

        <p className="mt-6 text-center text-gray-600">
          Remembered your password?{" "}
          <a
            href="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
