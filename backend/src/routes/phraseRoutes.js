const express = require('express');
const router = express.Router();
const phraseController = require('../controllers/phraseController');

router.get('/', phraseController.getAllPhrases);
router.post('/', phraseController.createPhrase);
router.put('/:id', phraseController.updatePhrase);
router.delete('/:id', phraseController.deletePhrase);

module.exports = router;
