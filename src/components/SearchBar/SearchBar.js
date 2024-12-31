import React, { useState, useCallback } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  // Debounced search logic
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const debouncedSearch = useCallback(
    debounce((input) => {
      onSearch(input);
    }, 500), // Adjust debounce delay as needed
    [onSearch]
  );

  // Trigger search after the input changes and debounce
  const handleSearch = () => {
    debouncedSearch(searchInput);
  };

  return (
    <div>
      <input
        aria-label="Search for a song"
        placeholder="Enter the song title here"
        value={searchInput}
        onChange={handleSearchChange}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

// Utility function to debounce input changes
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

export default SearchBar;
