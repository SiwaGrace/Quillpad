import React from "react";
import logoLeaf from "../../assets/logo/quillpad_logo3.png";

const SplashScreen = ({ message = "Entering your sanctuary..." }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0c1817] transition-colors duration-500">
      <div className="relative flex flex-col items-center">
        {/* Animated Ripple/Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-primary-400/20 rounded-full blur-3xl animate-pulse" />
          {/* v4 allows standard animate-ping here */}
          <div className="absolute w-24 h-24 border border-primary-400/20 rounded-full animate-ping" />
        </div>

        {/* Logo Container */}
        <div className="relative z-10 mb-8">
          <img
            src={logoLeaf}
            alt="Quillpad Logo"
            className="w-20 h-20 md:w-24 md:h-24 object-contain animate-bounce-slow"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-serif font-bold text-[#0d1b18] dark:text-white tracking-tight mb-2">
            QuillPad
          </h2>

          {/* The Loading Bar using our new v4 animation */}
          <div className="w-48 h-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden mt-4 relative">
            <div className="absolute inset-0 bg-primary-400 animate-loading-bar" />
          </div>

          <p className="mt-8 text-[10px] font-bold text-primary-400/80 uppercase tracking-[0.3em] animate-pulse">
            {message}
          </p>
        </div>
      </div>

      {/* Security Footer */}
      <div className="absolute bottom-12 flex items-center gap-2 text-[10px] text-slate-400 dark:text-white/20 uppercase tracking-widest font-bold">
        <span className="material-symbols-outlined text-[14px]">lock</span>
        End-to-End Encrypted
      </div>
    </div>
  );
};

export default SplashScreen;
