import React, { useCallback } from "react";
import "../css/Track.css";

const Track = (props) => {
  const { onAdd, onRemove, track } = props;

  const addSong = useCallback((event) => {
    onAdd(track);
  },
  [onAdd, track]);

  const removeSong = useCallback((event) => {
    onRemove(track);
  },
  [onRemove, track]);

 
  
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
        <h3>{track.name}</h3>
        <p>Artist: {track.artist} | Album: {track.album}</p>
      </div>
        { 
            handleClickTrack()
        }
    </div>
  );
};

export default Track;

