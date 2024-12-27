import React from "react";
import "./SearchResults.css";
import Tracklist from "../Tracklist/Tracklist";

const SearchResults = (props) => {

  return (
    <div className="SearchResults">
      <h2>Matching results:</h2>
      <Tracklist tracks={props.searchResults} onAdd={props.onAddToPlaylist} />
    </div>
  );
};

export default SearchResults;