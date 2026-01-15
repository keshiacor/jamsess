import React, { useCallback, useState } from "react";
import "../css/Playlist.css";
import Tracklist from "./Tracklist.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Playlist = (props) => {
  const { onUpdateName, playlistName, playlistTracks, onSave, onRemove } =
    props;
  const [placeholder, setPlaceholder] = useState("Enter Playlist Name");

  const updatePlaylistName = useCallback(
    (event) => {
      onUpdateName(event.target.value);
    },
    [onUpdateName]
  );

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleSave = () => {
    if (playlistTracks.length === 0) {
      toast.error(
        "Oops,looks like you haven't added a song to the playlist yet!",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "custom-toast",
        }
      );
    } else {
      onSave();
      toast.success("Your playlist has been saved to Spotify!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="playlist-save">
      <input
        onChange={updatePlaylistName}
        placeholder={placeholder}
        value={playlistName}
        className="playlistEdit"
        onFocus={handleFocus}
      />
      <Tracklist tracks={playlistTracks} isRemoved={true} onRemove={onRemove} />
      <button className="savePlaylist-button" onClick={handleSave}>
        Save To Spotify
      </button>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Playlist;
