const songs = require("./db");
const schema = songs.Schema;

const songSchema = new schema ({
    songName: String,
    artist: String,
    url: String
});

const Song = songs.model("Song", songSchema);

module.exports = Song;