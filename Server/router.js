const express = require("express");
const controller = require("./controller");
const router = express.Router();
const upload = require("./middlewares/multer");

// Define routes
router.post("/upload", upload.single("songFile"), controller.uploadSong);
router.get("/", controller.getAllSongs);
router.route("uploads/${songData.songFile}").get(controller.downloadSong);
router.get("/songs", controller.searchSongs);

module.exports = router;
