import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Outlet /> {/* Renders the current route's component */}
      </main>
      <Footer />
    </div>
  );
};

export default App;
