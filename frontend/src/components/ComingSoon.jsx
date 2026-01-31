import { PiHourglassLowLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const ComingSoon = ({ featureName }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center min-h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Icon with a soft pulse */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
        <PiHourglassLowLight size={64} className="text-primary relative z-10" />
      </div>

      {/* Text Content */}
      <h2 className="serif-text text-2xl font-bold text-[#0e1b19] dark:text-white mb-2">
        {featureName || "Something New"} is Brewing
      </h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed italic">
        We're carefully crafting this part of the sanctuary. It will be ready
        for your thoughts very soon.
      </p>

      {/* Action Button */}
      <button
        onClick={() => navigate("/home")}
        className="mt-8 text-sm font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
      >
        <span className="text-lg">←</span> Go Back
      </button>
    </div>
  );
};

export default ComingSoon;
