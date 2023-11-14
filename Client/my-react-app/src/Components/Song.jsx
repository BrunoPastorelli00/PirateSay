function Song({ songData, onPlay, isPlaying, isLastPlayed, audioRef }) {
  const songClass = isLastPlayed ? "song-container playing" : "song-container";
  const downloadSongUrl = `http://localhost:3232/uploads/${songData.songFile}`;

  return (
    <div className={songClass} onClick={() => onPlay(songData)}>
      <div className="song-details">
        <h3>{songData.songName}</h3>
        <p>{songData.artist}</p>
      </div>
      <div className="song-controls">
        <button className="play-pause-button" onClick={(e) => {
          e.stopPropagation(); 
          onPlay(songData);
        }}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <a href={downloadSongUrl} download className="download-button" onClick={(e) => e.stopPropagation()}>Download</a>
      </div>
    </div>
  );
}

export default Song;
