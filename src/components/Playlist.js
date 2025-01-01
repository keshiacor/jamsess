import React, { useCallback } from "react";
import "../css/Playlist.css";
import Tracklist from "./Tracklist.js";

const Playlist = (props) => {
  const { onUpdateName, playlistName } = props;

  const updatePlaylistName = useCallback(
    (event) => {
      onUpdateName(event.target.value);
    },
    [onUpdateName]
  );

  return (
    <div className='playlist-save'>
      <input onChange={updatePlaylistName} defaultValue={"New Playlist"} value={playlistName} />
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
