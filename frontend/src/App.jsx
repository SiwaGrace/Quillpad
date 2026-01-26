import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-[#0e1b19] dark:text-gray-100">
      <Helmet>
        <title>Quillpad — Write, Edit & Publish Smarter</title>
        <meta
          name="description"
          content="Quillpad helps writers and creators draft, edit, and publish ideas with a clean, distraction-free editor."
        />
        <meta
          name="keywords"
          content="quillpad, writing app, notes, journal, blogging, editor"
        />
        <meta name="author" content="Siwa Grace" />

        {/* Open Graph (Facebook/LinkedIn preview) */}
        <meta
          property="og:title"
          content="Quillpad — Write, Edit & Publish Smarter"
        />
        <meta
          property="og:description"
          content="A simple, powerful writing app built for creators."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/quillpad-preview.png" />
        <meta property="og:url" content="https://your-quillpad-domain.com" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Quillpad — Write, Edit & Publish Smarter"
        />
        <meta
          name="twitter:description"
          content="Quillpad helps you focus on your writing."
        />
        <meta name="twitter:image" content="/quillpad-preview.png" />
      </Helmet>
      {/* 1. DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0c1817] p-6">
        <Navigation />
      </aside>

      {/* 2. MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity md:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside
        className={`fixed left-4 top-4 bottom-4 z-50 w-64 bg-white dark:bg-[#0c1817] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 transform transition-transform duration-300 md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-[110%]"
        }`}
      >
        <div className="h-full p-6">
          {/* Reuse Navigation here, passing the close function */}
          <Navigation onClose={() => setIsSidebarOpen(false)} />
        </div>
      </aside>

      {/* 3. MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="md:hidden flex items-center p-4 bg-white dark:bg-[#0c1817] ">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2">
            <HiOutlineMenuAlt1 />
          </button>
          <span className="ml-4 font-bold">Quillpad</span>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
// <main className="container mx-auto px-4 py-8 flex-grow">
//
// </main>

export default App;
