// const Song = require("./models/songs");
// const path = require("path");
// const assyncWrapper = require('./middlewares/asyncWrapper');

// exports.getAllSongs = async (req, res) => {
//     try {
//         const songs = await Song.find();
//         res
//         .status(200)
//         .json(songs);
//     } catch (error) {
//         console.log(error);
//     }
// };

// exports.uploadSong = assyncWrapper(async(req, res) => {
//     const {songName} = req.body;
//     const {artist} = req.body;
//     const songFile = req.file.path; // Instead of req.body.path
//     const song = await Song.create({songName, artist, songFile});
//     res.status(201).json({song})
// })

// exports.downloadSong = assyncWrapper(async(req, res, next) => {
//     const {id} = req.params;
//     const song = await Song.findById(id);
//     if(!song) {
//         return next(new Error("No song found"))
//     }
//     const songFile = song.songFile;
//     const filePath = path.join(__dirname, `../${songFile}`);
//     res.download(filePath);
// })


const Song = require("./models/songs");
const path = require("path");
const asyncWrapper = require('./middlewares/asyncWrapper');

// Get all songs
exports.getAllSongs = asyncWrapper(async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Upload a song
exports.uploadSong = asyncWrapper(async (req, res) => {
    const { songName, artist } = req.body;
    // Store only the relative path from the 'uploads' directory
    const songFile = req.file.filename; // Use filename directly
    const song = await Song.create({ songName, artist, songFile });
    res.status(201).json({ song });
});

// Download a song
exports.downloadSong = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const song = await Song.findById(id);
    if (!song) {
        return next(new Error("No song found"));
    }
    // Construct the file path for download
    const filePath = path.join(__dirname, '../uploads', song.songFile);
    res.download(filePath);
});

exports.searchSongs = asyncWrapper(async (req, res) => {
    const searchTerm = req.query.term;
    if (!searchTerm) {
        return res.status(400).json({ error: 'No search term provided' });
    }

    try {
        // Modify this query as needed to search in desired fields
        const songs = await Song.find({
            $or: [
                { songName: { $regex: searchTerm, $options: 'i' } },
                { artist: { $regex: searchTerm, $options: 'i' } }
            ]
        });

        res.status(200).json(songs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});