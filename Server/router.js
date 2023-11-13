const router = require("express").Router;
const controller = require("./controller");


// Show songList on the page
router.get("/", controller.songList);
//post new song to the database.
router.post("/add", controller.addSong);

module.exports = router;


