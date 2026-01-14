import React, { useState, useCallback } from "react";
import "../css/App.css";
import Spotify from "../util/Spotify.js";
import Playlist from "./Playlist.js";
import SearchResults from "./SearchResults.js";
import SearchBar from "./SearchBar.js";

function App() {
  const [searchResults, setSearchResults] = useState("");
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTrack, setPlaylistTracks] = useState([]);

  //search for a track  using the Spotify API
  const search = useCallback((inputSearch) => {
    Spotify.search(inputSearch).then(setSearchResults);
  }, []);

  const addToPlaylist = useCallback(
    (track) => {
      if (
        !playlistTrack.some((existingTrack) => existingTrack.id === track.id)
      ) {
        setPlaylistTracks([...playlistTrack, track]);
      }
    },
    [playlistTrack]
  );

  const removeFromPlaylist = useCallback(
    (track) => {
      setPlaylistTracks(
        playlistTrack.filter((existingTrack) => existingTrack.id !== track.id)
      );
    },
    [playlistTrack]
  );

  const updatePlaylist = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    const trackURIs = playlistTrack.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTrack]);

  return (
    <div className="App">
      <header>
        {" "}
        <h1>JamSess</h1> <h2> Spotify playlist manager</h2>
      </header>
      <div className="BannerContainer"></div>

      <div className="SearchContainer">
        <SearchBar onSearch={search} />
      </div>

      <div className="MainContainer">
        <div className="ResultsSection">
          <SearchResults searchResults={searchResults} onAdd={addToPlaylist} />
        </div>

        <div className="PlaylistContainer">
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTrack}
            onUpdateName={updatePlaylist}
            onRemove={removeFromPlaylist}
            onSave={savePlaylist}
          />
        </div>
      </div>
      <footer className="footer">
        <ul>
          <li>© Copyright Keshia C. {new Date().getFullYear()} </li>
          <li>
            <a href="https://www.linkedin.com/in/keshia-coriolan/">
              {" "}
              LinkedIn{" "}
            </a>
          </li>
          <li>
            <a href="https://github.com/keshiacor"> GitHub </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
