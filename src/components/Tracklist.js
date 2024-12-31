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
            onAdd={props.onAdd}
            onRemove={props.removeSong}
            isRemoved={props.isRemoved}
          />
        );
      })}
    </div>
  )
};

export default Tracklist;