import { Link } from "react-router-dom";

const FinalCTA = () => (
  <section className="">
    <div className="px-4 md:px-40 max-w-[1200px] mx-auto">
      <div className="bg-primary-600 rounded-xl md:rounded-lg p-12 md:p-20 text-center flex flex-col items-center gap-8 relative overflow-hidden">
        {/* Background Decorative Blurs */}
        <div className="absolute inset-0 bg-white/5 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        </div>

        <h2 className="text-white serif-heading text-4xl md:text-5xl font-bold max-w-[700px] leading-tight z-10">
          Ready to start your journey towards clarity?
        </h2>
        <p className="text-white/80 text-lg md:text-xl max-w-[500px] z-10">
          Join 5,000+ creators and builders who have found their sanctuary.
        </p>
        <Link
          to="/register"
          className="flex min-w-[220px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-white text-primary text-base font-bold shadow-2xl hover:scale-105 transition-all z-10"
        >
          Create Your Sanctuary
        </Link>
      </div>
    </div>
  </section>
);

export default FinalCTA;
