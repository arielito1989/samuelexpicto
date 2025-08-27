const express = require('express');
const router = express.Router();
const phraseController = require('../controllers/phraseController');
const multer = require('multer');
const path = require('path');

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: './public/uploads/audio/',
  filename: function(req, file, cb) {
    cb(null, `audio-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Initialize upload variable
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
}).single('audio'); // The 'name' attribute of the file input in the form

router.get('/', phraseController.getAllPhrases);
// Pass the 'upload' middleware to the routes that handle file uploads
router.post('/', upload, phraseController.createPhrase);
router.put('/:id', upload, phraseController.updatePhrase);
router.delete('/:id', phraseController.deletePhrase);

module.exports = router;
