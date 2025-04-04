const express = require('express');
const router = express.Router();
const File = require('../models/File');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

// Upload File
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      path: `/public/uploads/${req.file.filename}`, // Local path
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
    await file.save();
    res.status(201).json({
      message: 'File uploaded successfully',
      fileId: file._id,
      url: `http://localhost:${process.env.PORT}${file.path}`,
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

    const filePath = path.join(__dirname, '..', file.path);
    res.sendFile(filePath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete File
router.delete('/files/:id', auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    const filePath = path.join(__dirname, '..', file.path);
    fs.unlinkSync(filePath); // Local file delete
    await File.findByIdAndDelete(req.params.id); // MongoDB se delete

    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;