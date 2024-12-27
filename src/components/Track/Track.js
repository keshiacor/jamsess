import React, { useCallback } from "react";
import "./Track.css";

const Track = ({ track, onClick, isRemoval }) => {
  const trackAction = useCallback(() => {
    onClick(track);
  }, [onClick, track]);

  return (
    <div className="Track">
      <div className='Track_details'>
        <h3>{track.name}</h3>
        <p>Artist: {track.artist} | Album: {track.album}</p>
      </div>
      <button className="button-action" onClick={trackAction}>
        {isRemoval ? "-" : "+"}
      </button>
    </div>
  );
};

export default Track;