import React, { useCallback } from "react";
import "../css/Track.css";

const Track = (props) => {
  
  const addSong = useCallback((event) => {
    props.add(props.track);
  },
  [props.add, props.track]);

  const removeSong = useCallback((event) => {
    props.onRemoveTrack(props.track);
  },
  [props.onRemoveTrack, props.track]);

 

  const handleClickTrack = () => {
    if (props.trackRemoved) {
      removeSong(props.track);
      return (
        <button className="button-action" onClick={removeSong}>
          -
        </button>)
    } else {
      addSong(props.track);
      return (
        <button className="button-action" onClick={addSong}>
         +
        </button>)
    }
  };

  return (
    <div className="Track">
      <div className='Track_details'>
        <h3>{props.track.name}</h3>
        <p>Artist: {props.track.artist} | Album: {props.track.album}</p>
      </div>
        {handleClickTrack()}
    </div>
  );
};

export default Track;

