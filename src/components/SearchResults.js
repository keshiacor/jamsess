import React from "react";
import "../css/SearchResults.css";
import Tracklist from "./Tracklist.js";

const SearchResults = (props) => {

  return (
    <div className="SearchResults">
      <h2>Matching results:</h2>
      <Tracklist tracks={props.searchResults} onAdd={props.onAdd} />
    </div>
  );
};

export default SearchResults;