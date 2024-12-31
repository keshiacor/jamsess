import React, {useCallback } from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

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
        isRemoval={true}
      />
    <button className='savePlaylist-button' onClick={props.onSave}>
    Save To Spotify
    </button>
  </div>
)
}
export default Playlist;