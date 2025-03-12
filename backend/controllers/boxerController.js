// src/controllers/boxerController.js
const prisma = require('../config/db');

// CREATE a boxer
exports.createBoxer = async (req, res) => {
  try {
    const newBoxer = await prisma.boxer.create({
      data: { ...req.body },
    });
    res.status(201).json(newBoxer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating boxer profile.' });
  }
};

// GET all boxers
exports.getAllBoxers = async (req, res) => {
  try {
    const boxers = await prisma.boxer.findMany();
    res.json(boxers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching boxers.' });
  }
};

// GET one boxer by NAME
exports.getBoxerByName = async (req, res) => {
  try {
    const { name } = req.query;
    const boxer = await prisma.boxer.findUnique({
      where: { name },
    });

    if (!boxer) {
      return res.status(404).json({ message: 'Boxer not found.' });
    }

    res.json(boxer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching boxer.' });
  }
};

// GET one boxer by ID
exports.getBoxerById = async (req, res) => {
  try {
    const { id } = req.params;
    const boxer = await prisma.boxer.findUnique({
      where: { id: parseInt(id) },
    });

    if (!boxer) {
      return res.status(404).json({ message: 'Boxer not found.' });
    }

    res.json(boxer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching boxer.' });
  }
};

// UPDATE a boxer by ID
exports.updateBoxer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBoxer = await prisma.boxer.update({
      where: { id: parseInt(id) },
      data: { ...req.body },
    });

    res.json(updatedBoxer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating boxer.' });
  }
};

// DELETE a boxer by ID
exports.deleteBoxer = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.boxer.delete({ where: { id: parseInt(id) } });

    res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting boxer.' });
  }
};
