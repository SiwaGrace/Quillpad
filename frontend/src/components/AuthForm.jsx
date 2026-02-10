import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo/quillpad_logo4.png";
import { clearAuthError, setAuthError } from "../features/authSlices";

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
      onlyRegister: true,
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

  // Filter fields based on the mode (Login vs Register) | username remove
  const isLogin = buttonText?.trim().toLowerCase() === "login";
  console.log(isLogin);
  const activeFields = fields.filter((f) => (isLogin ? !f.onlyRegister : true));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const { user, loginLoading, registerLoading, error } = useSelector(
    (state) => state.auth,
  );

  // This covers you regardless of what the "title" is
  const isSubmitting = loginLoading || registerLoading;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });

    // checkbox and inputs
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      // If it's a checkbox, use 'checked', otherwise use 'value'
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear the error message when the user starts correcting it
    if (error) {
      dispatch(clearAuthError());
    }
  };

  // 🔥 Handle form submit with Redux thunk
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation CAN DELETE LATER
    if (formData.password.length < 6) {
      // You'll need an action in your authSlice to set a manual error
      dispatch(setAuthError("Password must be at least 6 characters"));
      return;
    }

    dispatch(authAction(formData));
  };

  // 🔥 Navigate after successful login/register
  useEffect(() => {
    if (user && !isSubmitting && !error) {
      navigate(from, { replace: true });
    }
  }, [user, isSubmitting, error, navigate, from]);

  return (
    <div className="bg-background-light  min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[440px] flex flex-col items-center">
        {/* logo area */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="text-primary size-10">
            <img src={logo} alt="app logo" className=" " />
          </div>
          <h2 className="text-[#0d1b18]  text-xl font-bold leading-tight tracking-tight">
            QuillPad
          </h2>
        </div>
        {/* card */}
        <div className="bg-white  w-full rounded-lg shadow-sm border border-[#d9d9d9]  p-8 md:p-10">
          {/* <!-- Header Text --> */}
          <div className="text-center mb-8">
            <h1 className="serif-heading text-[#0d1b18]  text-[32px] font-semibold leading-tight mb-2">
              {title}
            </h1>
            <p className="text-[#4c9a86] text-sm">{desc}</p>
          </div>
          {/* Global Error Alert Display Section */}

          <div className="min-h-[60px] mb-2">
            {" "}
            {/* Fixed height prevents layout jump */}
            {error && (
              <div className="flex items-start gap-3 bg-red-50  border border-red-200  p-4 rounded-xl animate-shake">
                <span className="material-symbols-outlined text-red-500 text-xl">
                  warning
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-red-700 ">
                    Something went wrong
                  </h4>
                  <p className="text-xs text-red-600  mt-0.5">{error}</p>
                </div>
                <button
                  onClick={() => dispatch(clearAuthError())}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">
                    close
                  </span>
                </button>
              </div>
            )}
          </div>
          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {activeFields.map((field) => {
              // Particular error target
              const isFieldInvalid =
                error?.toLowerCase().includes(field.name.toLowerCase()) ||
                (field.name === "password" &&
                  error?.toLowerCase().includes("credentials")) ||
                (field.name === "username" &&
                  error?.toLowerCase().includes("user"));

              return (
                <div key={field.name} className="flex flex-col gap-1.5">
                  <label className="text-[#0d1b18]  text-sm font-medium px-1">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    // 2. Highlighting the specific input on error
                    className={`w-full h-12 rounded-xl border bg-transparent px-4 outline-none transition-all  placeholder:text-gray-400
                ${isFieldInvalid ? "border-red-300  focus:ring-red-500" : "border-[#d9d9d9]  focus:ring-[#13ecb6]"}`}
                    required
                  />
                </div>
              );
            })}

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
              disabled={isSubmitting}
              className={`w-full bg-[#13ecb6] hover:bg-opacity-90 text-[#0d1b18] font-bold h-12 rounded-lg transition-all shadow-sm active:scale-[0.98] cursor-pointer mt-2 
    ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#0d1b18] border-t-transparent rounded-full animate-spin" />
                  Please wait...
                </div>
              ) : (
                buttonText
              )}
            </button>
            {/* Error */}
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
        </div>
        {/* <!-- Bottom Disclaimer --> */}
        <div className="mt-12 text-center max-w-[400px]">
          <p className="text-[11px] leading-relaxed text-background-400  uppercase tracking-widest">
            Your entries are encrypted &amp; private. By signing up, you agree
            to our Terms of Sanctuary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
