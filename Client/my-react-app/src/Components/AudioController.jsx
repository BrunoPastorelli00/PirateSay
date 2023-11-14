import React from 'react';

function AudioController({ isPlaying, onTogglePlay, onVolumeChange }) {
  const handlePlayPause = () => {
    onTogglePlay();
  };

  const handleVolumeChange = (event) => {
    onVolumeChange(event.target.value);
  };

  return (
    <div className="audio-controller">
      <button onClick={handlePlayPause}>
        {isPlaying ? '⏸️' : '▶️'}
      </button>
      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.01" 
        onChange={handleVolumeChange} 
        defaultValue="1"
      />
    </div>
  );
}

export default AudioController;
