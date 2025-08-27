const { Phrase } = require('../../models');

exports.getAllPhrases = async (req, res) => {
  try {
    const phrases = await Phrase.findAll();
    res.json(phrases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPhrase = async (req, res) => {
  try {
    // Text fields from the form are in req.body
    const { title, fullSentence, imageUrl } = req.body;
    let audioUrl = null;

    // Multer adds the file object to the request if it exists
    if (req.file) {
      // Construct the URL path for the uploaded file to be saved in the DB
      audioUrl = `/public/uploads/audio/${req.file.filename}`;
    }

    const newPhrase = await Phrase.create({
      title,
      fullSentence,
      imageUrl,
      audioUrl
    });

    res.status(201).json(newPhrase);
  } catch (error) {
    console.error('Error creating phrase:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updatePhrase = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, fullSentence, imageUrl } = req.body;

    const dataToUpdate = {
      title,
      fullSentence,
      imageUrl,
    };

    // If a new file is uploaded, add its URL to the update object
    if (req.file) {
      dataToUpdate.audioUrl = `/public/uploads/audio/${req.file.filename}`;
    }

    const [updated] = await Phrase.update(dataToUpdate, {
      where: { id }
    });

    if (updated) {
      const updatedPhrase = await Phrase.findOne({ where: { id } });
      res.status(200).json(updatedPhrase);
    } else {
      res.status(404).json({ error: 'Phrase not found' });
    }
  } catch (error) {
    console.error('Error updating phrase:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deletePhrase = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Phrase.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Phrase not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
