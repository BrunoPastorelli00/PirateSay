import React, { useState, useEffect, useRef } from 'react';
import Song from './Song';

function SongList() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    fetch('http://localhost:3232/') // Fetch the list of songs
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log to inspect the data
        setSongs(data);
      })
      .catch(error => console.error('Error fetching songs:', error));
  }, []);

  const handlePlay = (songData) => {
    const songUrl = `http://localhost:3232/uploads/${songData.songFile}`; // Construct the URL to access the song file

    if (currentSong && currentSong._id === songData._id) {
      // Toggle play/pause if the current song is clicked again
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    } else {
      // If a new song is clicked, change the current song and play it
      if (currentSong) {
        audioRef.current.pause();
      }
      audioRef.current.src = songUrl; // Update the audio source
      audioRef.current.play();
      setCurrentSong(songData);
    }
  };

  return (
    <div className="song-list">
      {songs.map((song, index) => (
        <Song 
          key={song._id || index}  // Use song _id or fallback to index
          songData={song}
          onPlay={() => handlePlay(song)}
        />
      ))}
    </div>
  );
}

export default SongList;
