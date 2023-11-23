import { IoPlayOutline } from "react-icons/io5";
import { IoPlayForwardOutline, IoPlayBackOutline } from "react-icons/io5";
import { CiPause1 } from "react-icons/ci";
import { FaDownload } from "react-icons/fa";

function Song({ songData, onPlay, onSkip, onBack, isPlaying, isLastPlayed, canGoBack, audioRef }) {
  const songClass = isLastPlayed ? "song-container playing" : "song-container";
  const downloadSongUrl = `http://localhost:3232/uploads/${songData.songFile}`;

  return (
    <div className={songClass} onClick={() => onPlay(songData)}>
      <div className="song-details">
        <h3>{songData.songName}</h3>
        <p>{songData.artist}</p>
      </div>
      <div className="song-controls">
        {canGoBack && (
          <button
            className="skip-button"
            onClick={(e) => {
              e.stopPropagation();
              onBack();
            }}
          >
            <IoPlayBackOutline />
          </button>
        )}
        <button
          className="skip-button"
          onClick={(e) => {
            e.stopPropagation();
            onPlay(songData);
          }}
        >
          {isPlaying ? <CiPause1 /> : <IoPlayOutline />}
        </button>
        <button
          className="skip-button"
          onClick={(e) => {
            e.stopPropagation();
            if (!isPlaying) {
              alert('No song is being played');
            } else if (typeof onSkip === 'function') {
              onSkip(songData);
            }
          }}
        >
          <IoPlayForwardOutline />
        </button>
        <a
          href={downloadSongUrl}
          download
          className="download-button"
          onClick={(e) => e.stopPropagation()}
        >
          <FaDownload />
        </a>
      </div>
    </div>
  );
}

export default Song;