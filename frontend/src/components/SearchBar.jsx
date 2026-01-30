import { useState } from "react";

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // This sends the text back up to the parent
  };

  return (
    <div className="relative group ">
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#50958f] text-[20px]">
        search
      </span>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-14 pl-12 pr-4 bg-white dark:bg-slate-800/50 border-none rounded-xl font-sans text-base focus:ring-2 outline-none focus:ring-primary-400 shadow-sm"
      />
    </div>
  );
};

export default SearchBar;
