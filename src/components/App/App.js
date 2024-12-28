import React, {useState, useCallback} from 'react';
import './App.css';
import Spotify from "../../util/Spotify.js";
import Playlist from "../Playlist/Playlist.js";
import SearchResults from "../SearchResults/SearchResults.js";
import SearchBar from "../SearchBar/SearchBar.js";
import Tracklist from "../Tracklist/Tracklist.js";


const App = () => {

  const [searchResults, setSearchResults] = useState('');
  const [playlistName, setPlaylistName]= useState('New Playlist');
  const [playlistTrack, setPlaylistTracks] = useState([]);
  
  const tracks = [{
      id: '1',
      name: 'Shape of You',
      artist: 'Ed Sheeran',
      album: 'Divide',
   },
   {
      id: '2',
      name: 'Vanidad',
      artist: 'Pinto Picasso',
      album: 'Casagemas',
   }, 
   {
    id: '3',
    name: 'Millionario',
    artist: 'Pinto Picasso',
    album: 'Casagemas'
   }
  ];

    //search for a track  using the Spotify API
    const search = useCallback((inputSearch) => {
        Spotify.search(inputSearch).then(setSearchResults);
    },[]);

    //add track to the user's playlist
    const onAddToPlaylist = useCallback((track) => {
      if(!playlistTrack.some((existingTrack) => existingTrack.id === track.id)) {
        setPlaylistTracks([...playlistTrack, track]);
      }
    });
    //remove a track from the user's playlist
    const removeTrackFromPlaylist = useCallback((track) => {
      setPlaylistTracks(playlistTrack.filter((existingTrack) => existingTrack.id !== track.id));
    });
    
  return (
    <div className="App">
     <p> JamSess is coming soon!</p>
     
     <Playlist
     //to do: pass the playlist name, playlist tracks, and the methods to update the playlist name and remove a track from the playlist
          />
    </div>
  );
};



export default App;
