const LandingPFooter = () => {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Journal", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" },
      ],
    },
  ];

  return (
    <footer className="py-12 border-t border-[#e6f4f4] dark:border-[#2a4544]">
      <div className="px-4 md:px-40 max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand Section */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <div className="flex items-center gap-3 text-primary">
            <div className="size-5">
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-[#0c1d1c] dark:text-[#f8fcfc] text-lg font-bold">
              QuillPad
            </h2>
          </div>
          <p className="text-[#45a19c] text-sm italic">
            Designed for those who build.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex gap-12 text-sm">
          {footerLinks.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <p className="font-bold text-[#0c1d1c] dark:text-white">
                {group.title}
              </p>
              {group.links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[#45a19c] hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center text-[#45a19c] text-xs">
        © {new Date().getFullYear()} QuillPad. All rights reserved.
      </div>
    </footer>
  );
};

export default LandingPFooter;
