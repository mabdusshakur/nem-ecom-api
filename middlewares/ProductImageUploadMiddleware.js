const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/product-images"));
  },
  filename: (req, file, cb) => {
    const randomString = Math.random().toString(36).substring(7);
    cb(null, `${randomString}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploadImages = multer({
  storage,
  limits: { fileSize: 8000000, files: 4 }, // Limit to 4 file with max size of 8MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).array("product-images[]");

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

module.exports = { uploadImages };
