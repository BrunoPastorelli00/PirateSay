const Song = require("./models/songs");

exports.eventList =  async (req, res) => {
    const songs = await Song.find();
    try {
        res.status(200).json(songs)
    } catch (error) {
        res.status(500).json({error: "Couldn't fetch the song"})
    }
}



