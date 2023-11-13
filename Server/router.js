const express = require('express');
const controller = require('./controller');
const router = express.Router();
const upload = require("./middlewares/multer");



// Define routes
router.post('/upload', upload.single('songFile'), controller.uploadSong);
router.get('/', controller.getAllSongs);
router.route("/download/:id").get(controller.downloadSong)
module.exports = router;