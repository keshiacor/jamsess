import React from "react";
import "./Track.css";

const Track = ({ track, addSong, removeSong,isRemoved }) => {
  
  const handleClickTrack = () => {
    if (isRemoved) {
      removeSong(track);
    } else {
      addSong(track);
    }
  };

  return (
    <div className="Track">
      <div className='Track_details'>
        <h3>{track.name}</h3>
        <p>Artist: {track.artist} | Album: {track.album}</p>
      </div>
      <button className="button-action" onClick={handleClickTrack}>
        {isRemoved ? "-" : "+"}
      </button>
    </div>
  );
};

export default Track;

