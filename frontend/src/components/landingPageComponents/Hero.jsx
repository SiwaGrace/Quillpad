import { Link } from "react-router-dom";

const Hero = () => (
  <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 text-center">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/10 to-transparent -z-10 blur-3xl opacity-50" />

    <div className="max-w-[840px] mx-auto px-4 flex flex-col items-center gap-8">
      <h1 className="serif-heading text-[#0c1d1c] dark:text-white text-5xl md:text-7xl font-bold leading-[1.1]">
        The digital sanctuary for your future self.
      </h1>
      <p className="text-[#45a19c] dark:text-[#a1c6c4] text-lg md:text-xl max-w-[640px]">
        A minimal space for deep reflection, vision tracking, and clarity.
        Designed for those who build.
      </p>
      <Link
        to="/register"
        className="bg-primary-500 text-white rounded-full h-14 px-8 py-3.5 text-base font-bold shadow-xl shadow-primary-400 hover:bg-primary-600 transition-all"
      >
        Start Your Journey
      </Link>

      {/* Dashboard Mockup */}
      <div className="mt-20 relative w-full max-w-[1000px] group">
        <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
        <div className="relative bg-white dark:bg-[#1a2e2d] rounded-xl shadow-2xl overflow-hidden border border-[#e6f4f4] dark:border-[#2a4544] transition-transform duration-1000 group-hover:-translate-y-2">
          {/* Mockup UI Inner Content */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#f8fcfc] dark:bg-[#0c1d1c] border-b border-[#e6f4f4] dark:border-[#2a4544]">
            <div className="size-2 rounded-full bg-[#ff5f56]" />
            <div className="size-2 rounded-full bg-[#ffbd2e]" />
            <div className="size-2 rounded-full bg-[#27c93f]" />
          </div>
          <div className="aspect-[16/9] p-8 flex flex-col gap-6">
            <div className="h-8 w-48 bg-[#e6f4f4] dark:bg-[#2a4544] rounded-full" />
            <div className="grid grid-cols-12 gap-6 h-full">
              <div className="col-span-4 bg-[#f8fcfc] rounded-lg border border-[#e6f4f4]" />
              <div className="col-span-8 bg-white dark:bg-[#122625] rounded-lg border border-[#e6f4f4] p-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
