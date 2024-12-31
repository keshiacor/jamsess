import React from "react";
import "../css/Tracklist.css";
import Track from "./Track.js";

const Tracklist = (props) => {
  return (
    <div className = "Tracklist">
      {props.tracks && props.tracks.map((track) => {
        return (
          <Track
            track={track}
            key={track.id} 
            addSong={props.addSong}
            //removeSong={props.removeSong}
            isRemoved={props.isRemoved}
            trackRemoved={props.trackRemoved}
          />
        );
      })}
    </div>
  )
};

export default Tracklist;