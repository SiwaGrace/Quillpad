import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo/quillpad_logo4.png";

const AuthForm = ({
  title,
  desc,
  buttonText,
  footerText,
  footerLink,
  footerLinkText,
  authAction, // 🔥 redux thunk passed from page
}) => {
  const fields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter your username",
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "name@example.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const { user, loginLoading, registerLoading, error } = useSelector(
    (state) => state.auth,
  );
  const isSubmitting =
    title.toLowerCase() === "login" ? loginLoading : registerLoading;

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
    if (user && !isSubmitting && !error) {
      navigate(from, { replace: true });
    }
  }, [user, isSubmitting, error, navigate, from]);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[440px] flex flex-col items-center">
        {/* logo area */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="text-primary size-10">
            <img src={logo} alt="app logo" className=" " />
          </div>
          <h2 className="text-[#0d1b18] dark:text-white text-xl font-bold leading-tight tracking-tight">
            QuillPad
          </h2>
        </div>
        {/* card */}
        <div className="bg-white dark:bg-[#1a2e2a] w-full rounded-lg shadow-sm border border-[#d9d9d9] dark:border-[#2a453f] p-8 md:p-10">
          {/* <!-- Header Text --> */}
          <div className="text-center mb-8">
            <h1 className="serif-heading text-[#0d1b18] dark:text-white text-[32px] font-semibold leading-tight mb-2">
              {title}
            </h1>
            <p className="text-[#4c9a86] text-sm">{desc}</p>
          </div>
          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col gap-1.5">
                <label className="text-[#0d1b18] dark:text-gray-200 text-sm font-medium px-1">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full h-12 rounded-xl border border-[#d9d9d9] dark:border-[#2a453f] bg-transparent px-4 focus:ring-2 focus:ring-[#13ecb6] focus:border-[#13ecb6] outline-none transition-all dark:text-white placeholder:text-gray-400"
                  required
                />
              </div>
            ))}

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
                  className="text-[#4c9a86] text-xs font-medium hover:underline"
                >
                  Forgot your password?
                </Link>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-[#13ecb6] hover:bg-opacity-90 text-[#0d1b18] font-bold h-12 rounded-lg transition-all shadow-sm active:scale-[0.98] mt-2"
            >
              {isSubmitting ? "Please wait..." : buttonText}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-gray-600">
            {footerText}{" "}
            <Link
              to={footerLink}
              className="text-[#4c9a86] text-md font-medium hover:underline"
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
        {/* <!-- Bottom Disclaimer --> */}
        <div className="mt-12 text-center max-w-[400px]">
          <p className="text-[11px] leading-relaxed text-background-400 dark:text-white/30 uppercase tracking-widest">
            Your entries are encrypted &amp; private. By signing up, you agree
            to our Terms of Sanctuary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
