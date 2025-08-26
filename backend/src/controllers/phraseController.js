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
  console.log('--> Petición POST a /api/phrases recibida con:', req.body);
  try {
    const { title, phrase, imageUrl, audioUrl } = req.body;
    // Mapear el campo 'phrase' del request a 'fullSentence' en el modelo
    const newPhrase = await Phrase.create({ title, fullSentence: phrase, imageUrl, audioUrl });
    console.log('    Frase creada con éxito en la BD:', newPhrase.toJSON());
    res.status(201).json(newPhrase);
  } catch (error) {
    console.error('    Error al crear la frase:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updatePhrase = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, phrase, imageUrl, audioUrl } = req.body;
    console.log(`Updating phrase ${id} with audioUrl:`, audioUrl);
    // Mapear el campo 'phrase' del request a 'fullSentence' en el modelo
    const [updated] = await Phrase.update({ title, fullSentence: phrase, imageUrl, audioUrl }, {
      where: { id }
    });
    if (updated) {
      const updatedPhrase = await Phrase.findOne({ where: { id } });
      res.status(200).json(updatedPhrase);
    } else {
      res.status(404).json({ error: 'Phrase not found' });
    }
  } catch (error) {
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
