import React, { useCallback } from "react";
import "../css/Track.css";
import previewIcon from '../previewButton.gif';

const Track = (props) => {
  const { onAdd, onRemove, track, onPreview, play } = props;

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

  const previewSong = () => {
    onPreview(track.id);
  }

  const playSong = () => {
    return play === track.id ? <img className='sound-bar' src={previewIcon} alt='Playing' /> :
    track.previewUrl === null ? <i className="fa-solid fa-play unclickable" onClick={ previewSong }></i> : <i className="fa-solid fa-play" onClick={ previewSong }></i>;
};
  

  return (
    <div className="Track">
      <div className='Track_details'>
      <div className='Track-play'>
                { playSong() }
      </div>
      <div className='Track-container'>
        <img src={track.image } alt="" /> 
      </div>
        <div className='Track_i'>
          <ul>
          <li><h3>{track.name}</h3> </li>
          <li> Artist: {track.artist} </li>
          <li> Album: {track.album}</li>
          </ul>
        </div>
      </div>
      <div>
        { 
            handleClickTrack()
        }
        </div>
    </div>
  );
};

export default Track;

