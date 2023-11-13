function Song({ songData, onPlay }) {
    return (
      <div className="song-container">
        <div className="song-details">
          <h3>{songData.songName}</h3>
          <p>{songData.artist}</p>
        </div>
        <button onClick={() => onPlay(songData)} className="play-button">▶️</button>
      </div>
    );
  }
export default Song;  