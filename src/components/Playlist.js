import React, { useCallback, useState } from "react";
import "../css/Playlist.css";
import Tracklist from "./Tracklist.js";


const Playlist = (props) => {
  const { onUpdateName, playlistName } = props;
  const [placeholder, setPlaceholder] = useState("New Playlist");

  const updatePlaylistName = useCallback(
    (event) => {
      onUpdateName(event.target.value);
    },
    [onUpdateName]
  );

  const handleFocus = () => {
    setPlaceholder(""); 
  };

  return (
    <div className='playlist-save'>
      <input onChange={updatePlaylistName} placeholder={placeholder}
      value={playlistName} className='playlistEdit' onFocus={handleFocus}/>
      <Tracklist
        tracks={props.playlistTracks}
        isRemoved={true}
        onRemove={props.onRemove}
      />
    <button className='savePlaylist-button' onClick={props.onSave}>
    Save To Spotify
    </button>
    </div>
  );
};

export default Playlist;
