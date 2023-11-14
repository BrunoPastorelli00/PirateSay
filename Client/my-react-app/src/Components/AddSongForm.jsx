import React, { useState, useRef } from "react";

function AddSongForm() {
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [songFile, setSongFile] = useState(null);
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!songName || !artist || !songFile) {
      alert("Please fill in all fields and select a file before submitting");
      return;
    }

    const formData = new FormData();
    formData.append("songName", songName);
    formData.append("artist", artist);
    formData.append("songFile", songFile);

    fetch("http://localhost:3232/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Song uploaded", data);
        resetForm();
      })
      .catch((error) => {
        console.error("Error uploading song", error);
      });
  };

  const resetForm = () => {
    setSongName("");
    setArtist("");
    setSongFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input field
    }
  };

  return (
    <div>
      <form className="add-song-form" onSubmit={handleSubmit}>
        <h1 className="addSong">Add Song</h1>
        <div className="form-group">
          <label htmlFor="song-name">Song:</label>
          <input
            type="text"
            id="song-name"
            name="songName"
            placeholder="Add song name..."
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="artist-name">Artist:</label>
          <input
            type="text"
            id="artist-name"
            name="artist"
            placeholder="Add artist name..."
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="file-upload">File:</label>
          <input
            type="file"
            id="songFile"
            name="songFile"
            ref={fileInputRef}
            onChange={(e) => setSongFile(e.target.files[0])}
          />
        </div>

        <button className="uploadSongButton" type="submit">
          Upload Song
        </button>
      </form>
    </div>
  );
}

export default AddSongForm;
