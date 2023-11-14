const multer = require("multer");

// Configure how files are stored
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination to 'uploads' directory
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    // Configure the filename: Use the current timestamp + original filename
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

// File filter configuration
const fileFilter = (req, file, cb) => {
  // Filter files based on their MIME type
  if (
    file.mimetype === "audio/mpeg" ||
    file.mimetype === "audio/ogg" ||
    file.mimetype === "audio/wav"
  ) {
    cb(null, true); // Accept file
  } else {
    cb(null, false); // Reject file
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 89128960 }, // Set file size limit (e.g., 85 MB)
  fileFilter: fileFilter,
});

module.exports = upload;
