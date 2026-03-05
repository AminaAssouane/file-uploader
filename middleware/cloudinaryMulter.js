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

function fileFilter(req, file, cb) {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
}

const parser = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
});

module.exports = parser;
