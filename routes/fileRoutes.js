const express = require('express');
const router = express.Router();
const File = require('../models/File');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadToS3, deleteFromS3 } = require('../utils/s3');

// Upload File
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const s3Response = await uploadToS3(req.file);

    const file = new File({
      filename: s3Response.Key,
      path: s3Response.Location, // URL of the file in S3
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
    await file.save();

    res.status(201).json({
      message: 'File uploaded successfully',
      fileId: file._id,
      url: file.path,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve File
router.get('/files/:id', auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    // Redirect to S3 URL (browser will handle viewing/downloading)
    res.redirect(file.path);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete File
router.delete('/files/:id', auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    await deleteFromS3(file.filename); // Delete from S3
    await File.findByIdAndDelete(req.params.id); // Delete from MongoDB

    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;