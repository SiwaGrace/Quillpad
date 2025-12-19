import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen bg-surface-bg flex flex-col">
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

      <Navigation />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
