import React, { useCallback } from "react";
import "../css/Track.css";

const Track = (props) => {
  
  const addSong = useCallback((event) => {
    props.onAdd(props.track);
  },
  [props.onAdd, props.track]);

  const removeSong = useCallback((event) => {
    props.onRemoveTrack(props.track);
  },
  [props.onRemoveTrack, props.track]);

 
  
  const handleClickTrack = () => {
    if (props.isRemoved) {
      return (
        <button className="button-action" onClick={removeSong}>
          -
        </button>);
    } else {
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
        { // Add a button to add or remove a track from the playlist
          /** 
          <button className="button-action" onClick={handleClickTrack()}>
            {props.isRemoved ? "-" : "+"}  
            </button> */
            handleClickTrack()
        }
    </div>
  );
};

export default Track;

