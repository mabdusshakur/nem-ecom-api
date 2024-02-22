const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/avatar"));
  },
  filename: (req, file, cb) => {
    const randomString = Math.random().toString(36).substring(7);
    cb(null, `${randomString}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploadAvatar = multer({
  storage,
  limits: { fileSize: 5000000, files: 1 }, // Limit to 1 file with max size of 5MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("avatar");

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb("Error: Only JPEG/JPG and PNG files are allowed!");
  }
}

module.exports = { uploadAvatar };
