const File = require('../models/File');
const fs = require('fs');
const path = require('path');

const cleanupFiles = async () => {
  try {
    const files = await File.find();
    const now = new Date();

    for (const file of files) {
      const fileAge = (now - new Date(file.createdAt)) / 1000; // Age in seconds
      if (fileAge > 604800) { // Older than 7 days
        const filePath = path.join(__dirname, '..', file.path);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`Deleted file: ${filePath}`);
        }
      }
    }
  } catch (err) {
    console.error('Cleanup error:', err.message);
  }
};

module.exports = { cleanupFiles };