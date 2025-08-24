const { Pictogram } = require('../../models');

exports.getAllPictograms = async (req, res) => {
  try {
    const pictograms = await Pictogram.findAll();
    res.json(pictograms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPictogram = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    const newPictogram = await Pictogram.create({ name, imageUrl });
    res.status(201).json(newPictogram);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePictogram = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, imageUrl } = req.body;
    const [updated] = await Pictogram.update({ name, imageUrl }, {
      where: { id }
    });
    if (updated) {
      const updatedPictogram = await Pictogram.findOne({ where: { id } });
      res.status(200).json(updatedPictogram);
    } else {
      res.status(404).json({ error: 'Pictogram not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePictogram = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Pictogram.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Pictogram not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

