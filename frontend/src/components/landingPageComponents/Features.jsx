import { MdEditNote, MdOutlineTrackChanges, MdInsights } from "react-icons/md";

const features = [
  {
    title: "Reflective Journaling",
    icon: <MdEditNote className="text-primary-600" />,
    desc: "A distraction-free writing environment optimized for deep thought.",
  },
  {
    title: "Vision Mapping",
    icon: <MdOutlineTrackChanges className="text-primary-600" />,
    desc: "Track and visualize your long-term goals with an intuitive interface.",
  },
  {
    title: "Emotional Insights",
    icon: <MdInsights className="text-primary-600" />,
    desc: "AI-powered trends to help you understand your clarity and focus.",
  },
];

const Features = () => (
  <section className="py-24 bg-white dark:bg-[#0c1d1c]/30">
    <div className="max-w-[1200px] mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Designed for Clarity
        </h2>
        <p className="text-[#45a19c] text-lg">
          Tools to help you focus on what matters most.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-8 rounded-lg border border-[#cdeae8] dark:border-[#2a4544] bg-[#f8fcfc] dark:bg-[#1a2e2d] hover:shadow-xl transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mb-6">
              <span className="material-symbols-outlined !text-3xl">
                {f.icon}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
            <p className="text-[#45a19c] dark:text-[#a1c6c4]">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
