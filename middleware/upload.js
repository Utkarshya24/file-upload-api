const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage(); // Store in memory before uploading to S3

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only images and PDFs are allowed'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: process.env.MAX_FILE_SIZE },
});

module.exports = upload;