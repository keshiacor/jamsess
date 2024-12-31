import React, {useCallback } from "react";
import "../css/Playlist.css";
import Tracklist from "./Tracklist.js";

const Playlist = (props) => {
  const updatePlaylistName = useCallback(
    (event) => {
      props.onUpdate(event.target.value);
    },
    [props.onUpdate]
  );

  const savePlaylist = useCallback(() => {
    props.onSave();
  }, [props.onSave]);

return (
  <div className='playlist-save'>
      <input onChange={updatePlaylistName} defaultValue={"New Playlist"} />
      <Tracklist
        tracks={props.playlistTracks}
        trackRemoved={true}
        onRemoveTrack={props.onRemoveTrack}
      />
    <button className='savePlaylist-button' onClick={props.onSave}>
    Save To Spotify
    </button>
  </div>
)
}
export default Playlist;