const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "my-app-files",
    allowed_formats: ["jpg", "png", "svg", "pdf", "docx"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }],
  },
});

const parser = multer({ storage });

module.exports = parser;
