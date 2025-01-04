import React from "react";
import "../css/SearchResults.css";
import Tracklist from "./Tracklist.js";

const SearchResults = (props) => {

  return (
    <div className="SearchResults">
      {props.searchResults.length > 0 && <h2>Matching results:</h2>}
      <Tracklist tracks={props.searchResults} onAdd={props.onAdd} />
    </div>
  );
};

export default SearchResults;