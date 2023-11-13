const multer = require('multer');
//conf how the files are storage
const storage = multer.diskStorage({
    destination: function(req, songFile, cb) {
        cb(null, "C:\\Users\\bruno\\codeworksBoot\\Senior\\soloproject\\project\\PirateSay\\Server\\uploads");
    },
    filename: function(req, songFile, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + songFile.originalname)
    },
});

const fileFilter = (req, songFile, cb) => {
    if(
        songFile.mimetype === "audio/mpeg" ||
        songFile.mimetype === "audio/ogg" ||
        songFile.mimetype === "audio/wav"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
};

const upload = multer({
    limits: { fileSize: 89128960 },
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;

