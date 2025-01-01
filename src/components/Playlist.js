import React, {useCallback } from "react";
import "../css/Playlist.css";
import Tracklist from "./Tracklist.js";

const Playlist = (props) => {
  const updatePlaylistName = useCallback(
    (event) => {
      props.onUpdateName(event.target.value);
    }
    //[props.onUpdateName]
  );

  const savePlaylist = useCallback(() => {
    props.onSave();
  }, [props.onSave]);

return (
  <div className='playlist-save'>
      <input onChange={updatePlaylistName} defaultValue={"New Playlist"} value={props.playlistName} />
      <Tracklist
        tracks={props.playlistTracks}
        isRemoved={true}
        onRemove={props.onRemove}
      />
    <button className='savePlaylist-button' onClick={props.onSave}>
    Save To Spotify
    </button>
  </div>
)
}
export default Playlist;