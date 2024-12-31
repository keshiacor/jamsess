import React from "react";
import "./Tracklist.css";
import Track from "../Track/Track.js";

const Tracklist = (props) => {
  return (
    <div className = "Tracklist">
      {props.tracks && props.tracks.map((track) => {
        return (
          <Track
            track={track}
            key={track.id} 
            addSong={props.addToPlaylist}
            isRemoved={props.isRemoved}
            onRemoveTrack={props.onRemoveTrack}
          />
        );
      })}
    </div>
  )
};

export default Tracklist;