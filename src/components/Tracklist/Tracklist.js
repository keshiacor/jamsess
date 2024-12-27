import React from "react";
import "./Tracklist.css";
import Track from "../Track/Track.js";

const Tracklist = (props) => {
  return (
    <div className = "Tracklist">
      {props.tracks.map((track) => {
        return (
          <Track
            track={track}
            key={track.id}
            onClick={props.onClick}
            isRemoval={props.isRemoval}
          />
        );
      })}
    </div>
  )
};

export default Tracklist;