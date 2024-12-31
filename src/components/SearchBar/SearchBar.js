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
      <input placeholder="Enter the song title here" onChange={handleSearchChange}/> 
      <button className="search-button" onClick={search}>
       Search
      </button>
    </div>
  );
};

export default SearchBar;