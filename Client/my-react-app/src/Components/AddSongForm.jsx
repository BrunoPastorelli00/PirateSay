function AddSongForm() {
  return (
    <div>
      <form className="add-song-form">
        <h1 className="addSong">Add Song</h1>
        <div className="form-group">
          <label htmlFor="song-name">Song:</label>
          <input
            type="text"
            id="song-name"
            name="songName"
            placeholder="add song name..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="artist-name">Artist:</label>
          <input
            type="text"
            id="artist-name"
            name="artist"
            placeholder="add artist name..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="file-upload">File:</label>
          <input type="file" id="songFile" name="songFile" accept=".mp3" />
        </div>

        <input type="submit" value="SEND" />
      </form>
    </div>
  );
}

export default AddSongForm;
