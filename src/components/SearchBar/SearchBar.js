import React, { useState, useCallback } from "react";
import "./SearchBar.css";

const SearchBar = (props) => {

  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = useCallback((event) => {
    setSearchInput(event.target.value);
  }, []);

  const search = useCallback(() => {
    props.onSearch(searchInput);
  },[props.onSearch, searchInput]);

  return (
    <div>
      <input placeholder="Looking for your favorite song? Enter it here" onChange={handleSearchChange}/> 
      <button className="search-button">
       Search
      </button>
    </div>
  );
};

export default SearchBar;