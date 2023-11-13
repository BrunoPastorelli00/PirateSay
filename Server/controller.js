const Song = require("./models/songs");
const path = require("path");
const assyncWrapper = require('./middlewares/asyncWrapper');

exports.getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res
        .status(200)
        .json(songs);
    } catch (error) {
        console.log(error);
    }
};

exports.uploadSong = assyncWrapper(async(req, res) => {
    const {songName} = req.body;
    const {artist} = req.body;
    const songFile = req.file.path; // Instead of req.body.path
    const song = await Song.create({songName, artist, songFile});
    res.status(201).json({song})
})

exports.downloadSong = assyncWrapper(async(req, res) => {
    const {id} = req.params;
    const song = await Song.findById(id);
    if(!song) {
        return next(new Error("No song found"))
    }
    const songFile = song.songFile;
    const filePath = path.join(__dirname, `../${songFile}`);
    res.download(filePath);
})
