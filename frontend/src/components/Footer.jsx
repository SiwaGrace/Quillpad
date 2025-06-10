import React from "react";
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Quillpad. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
