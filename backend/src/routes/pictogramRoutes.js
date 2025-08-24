const express = require('express');
const router = express.Router();
const pictogramController = require('../controllers/pictogramController');

router.get('/', pictogramController.getAllPictograms);
router.post('/', pictogramController.createPictogram);
router.put('/:id', pictogramController.updatePictogram);
router.delete('/:id', pictogramController.deletePictogram);

module.exports = router;

