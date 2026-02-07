import { Link } from "react-router-dom";
import logo from "../../assets/logo/quillpad_logo4.png";

const LandingPNavbar = () => (
  <nav className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#e6f4f4] dark:border-[#2a4544]">
    <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-1 text-primary">
        <div className="size-9">
          <img src={logo} alt="app logo" className=" " />
        </div>
        <h2 className="text-[#0c1d1c] dark:text-[#f8fcfc] text-xl font-bold tracking-tight">
          QuillPad
        </h2>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex gap-8 text-sm font-medium">
          {/* <Link to="/" className="hover:text-primary transition-colors">
            Features
          </Link> */}

          <Link
            to="/login"
            className="hover:text-[#45a19c] transition-colors underline"
          >
            Login
          </Link>
        </div>
        <Link
          to="/register"
          className="hidden md:flex rounded-full bg-primary-500 px-6 py-2.5 text-white text-sm font-bold shadow-lg shadow-primary-400 hover:scale-105 transition-transform active:scale-95"
        >
          Get Started
        </Link>
      </div>
    </div>
  </nav>
);

export default LandingPNavbar;
