import React, { useState, useCallback } from "react";
import "./Playlist.css";

const Playlist = (props) => {
  const updatePlaylistName = useCallback(
    (event) => {
      props.onUpdate(event.target.value);
    },
    [props.onUpdate]
  );

return (
  <div className='playlist-save'>
      <input onChange={updatePlaylistName} defaultValue={"New Playlist"} />
      <TrackList
        tracks={props.playlistTracks}
        isRemoval={true}
      />
    <button className='savePlaylist-button' onClick={props.onSave}>
    Save To Spotify
    </button>
  </div>
)
}
export default Playlist;