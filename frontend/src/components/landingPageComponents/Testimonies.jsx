const Testimonial = () => (
  <section className="py-24 bg-background-light dark:bg-background-dark">
    <div className="px-4 md:px-40 max-w-[960px] mx-auto flex flex-col items-center">
      <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-8">
        Testimonial
      </span>
      <div className="relative">
        <span className="absolute -top-10 -left-10 text-primary/10 text-9xl serif-heading">
          “
        </span>
        <blockquote className="serif-heading italic text-[#0c1d1c] dark:text-white text-3xl md:text-4xl text-center leading-snug px-4">
          QuillPad has completely transformed my daily routine. It's the only
          space where I can truly find focus and calm amidst the chaos of
          building a company.
        </blockquote>
      </div>
      <div className="mt-10 flex flex-col items-center gap-2">
        <div className="size-16 rounded-full bg-gradient-to-tr from-primary to-[#8dece6] p-0.5">
          <div className="w-full h-full rounded-full bg-[#f8fcfc] overflow-hidden">
            <img
              alt="Alex Rivers"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyVCzu5sCF0_zVSxlM2f1Sb-FywJDB9mU2HnVsPXywuJ_9Jb-iVvFeynfjqnVucUulCIyfRbpEwD5Rp7b5q2cPMYAVHCJMk6arzNP00VPZ8ZVehz4vdnngRiPBzGWd3Z_S_K5Kv5Q_zBi2prsdKEfXfr8ve5m_HpR4NkemXGcC1zPREBc1EvJMTML17s1Sra4isYJUDK4xI3Bn-KH1XOY3RBCTDRJKtwmoYDD-z3J6ZOqfmxbq6yYvEU8RdV28Xkk-e1KKe1L6lVme"
            />
          </div>
        </div>
        <div className="text-center">
          <p className="text-[#0c1d1c] dark:text-white font-bold">
            Alex Rivers
          </p>
          <p className="text-primary text-sm font-medium">
            Solo Founder, LucidFlow
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Testimonial;
