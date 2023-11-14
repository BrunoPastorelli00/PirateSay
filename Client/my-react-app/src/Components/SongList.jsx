import React, { useState, useEffect, useRef, useCallback } from 'react';
import Song from './Song';

function SongList({ searchTerm }) {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [lastPlayed, setLastPlayed] = useState(null);
  const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(new Audio());

  const shuffleSongs = useCallback((array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }, []);

  useEffect(() => {
    fetch('http://localhost:3232/')
      .then(response => response.json())
      .then(data => {
        const shuffledSongs = shuffleSongs([...data]);
        setSongs(shuffledSongs);
      })
      .catch(error => console.error('Error fetching songs:', error));
  }, [shuffleSongs]);

  const handlePlay = useCallback((songData) => {
    const songUrl = `http://localhost:3232/uploads/${songData.songFile}`;
    if (!currentSong || currentSong._id !== songData._id) {
      audioRef.current.src = songUrl;
      setLastPlayed(songData);
      setCurrentSong(songData);
      setVolume(0.5); // Set volume to 50% when a new song is loaded
    }
  
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsCurrentlyPlaying(true);
    } else {
      audioRef.current.pause();
      setIsCurrentlyPlaying(false);
    }
  }, [currentSong]);

  const playNextSong = useCallback(() => {
    const currentSongIndex = songs.findIndex(song => song._id === currentSong._id);
    const nextSong = songs[currentSongIndex + 1];

    if (nextSong) {
      handlePlay(nextSong);
    } else {
      setCurrentSong(null);
      setIsCurrentlyPlaying(false);
    }
  }, [currentSong, songs, handlePlay]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener('ended', playNextSong);

    return () => {
      audio.removeEventListener('ended', playNextSong);
    };
  }, [playNextSong]);

  useEffect(() => {
  const audio = audioRef.current;
  audio.addEventListener('ended', playNextSong);

  // Set the volume to 50% whenever a new song is about to play
  const setVolumeToHalf = () => setVolume(0.5);
  audio.addEventListener('loadeddata', setVolumeToHalf);

  return () => {
    audio.removeEventListener('ended', playNextSong);
    audio.removeEventListener('loadeddata', setVolumeToHalf);
  };
}, [playNextSong]);

  useEffect(() => {
    const updateProgress = () => {
      const duration = audioRef.current.duration;
      const currentTime = audioRef.current.currentTime;
      setProgress((currentTime / duration) * 100);
    };

    if (isCurrentlyPlaying) {
      audioRef.current.addEventListener('timeupdate', updateProgress);
    }

    return () => {
      audioRef.current.removeEventListener('timeupdate', updateProgress);
    };
  }, [isCurrentlyPlaying]);

  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    const duration = audioRef.current.duration;
    audioRef.current.currentTime = (newProgress / 100) * duration;
    setProgress(newProgress);

    if (!audioRef.current.paused) {
      audioRef.current.play();
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const isPlaying = useCallback((songData) => {
    return currentSong && songData._id === currentSong._id && isCurrentlyPlaying;
  }, [currentSong, isCurrentlyPlaying]);

  const filteredSongs = songs.filter(song =>
    song.songName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedSongs = filteredSongs.sort((a, b) => {
    if (isPlaying(a)) return -1;
    if (isPlaying(b)) return 1;
    if (lastPlayed && a._id === lastPlayed._id) return -1;
    if (lastPlayed && b._id === lastPlayed._id) return 1;
    return 0;
  });

  return (
    <div className="song-list">
      {sortedSongs.map((song, index) => (
        <React.Fragment key={song._id || index}>
          <Song 
            songData={song}
            onPlay={() => handlePlay(song)}
            isPlaying={isPlaying(song)}
            isLastPlayed={lastPlayed && song._id === lastPlayed._id}
            audioRef={audioRef}
          />
          {isPlaying(song) && (
            <div className="audio-controls">
              <div className="volume-control">
                <label htmlFor="volume-slider">Volume:</label>
                <input 
                  id="volume-slider"
                  type="range" 
                  className="volume-slider" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>
              <div className="progress-control">
                <label htmlFor="progress-bar">Track Progress:</label>
                <input
                  id="progress-bar"
                  type="range"
                  className="progress-bar"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleProgressChange}
                />
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default SongList;
