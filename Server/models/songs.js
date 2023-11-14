const songs = require("./db");

const songSchema = new songs.Schema({
  songName: String,
  artist: String,
  songFile: String,
});

module.exports = songs.model("Song", songSchema);
