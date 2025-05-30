// src/controllers/boxerController.js
const prisma = require('../config/db');

exports.createBoxer = async (req, res) => {
  try {
    // Store ONLY the filename (no "uploads/" prefix)
    const profileImage = req.file ? req.file.filename : null; // ⚠️ Critical change

    const data = {
      name: req.body.name,
      country: req.body.country,
      sex: req.body.sex,
      profileImage,
      club: req.body.club,
      province: req.body.province,
      age: parseInt(req.body.age, 10),
      weight: parseInt(req.body.weight, 10),
      stance: req.body.stance,
      bio: req.body.bio,
      level: req.body.level,
      fightsWon: parseInt(req.body.fightsWon, 10),
      fightsLost: parseInt(req.body.fightsLost, 10),
      videoUrl: req.body.videoUrl,
    };

    const newBoxer = await prisma.boxer.create({ data });
    res.status(201).json(newBoxer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating boxer profile.' });
  }
};

// GET all boxers with filtering support
exports.getAllBoxers = async (req, res) => {
  try {
    const { sex, club, country, weight, level } = req.query;
    const filters = {};

    if (sex) {
      filters.sex = sex;
    }
    if (club) {
      filters.club = club;
    }
    if (country) {
      filters.country = country;
    }
    if (weight) {
      // If weight is stored as a number in the database, you might want to convert it
      filters.weight = parseInt(weight);
    }
    if (level) {
      filters.level = level;
    }

    const boxers = await prisma.boxer.findMany({
      where: filters,
    });
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

    const profileImage = req.file ? req.file.filename : req.body.profileImage;

    const data = {
      name: req.body.name,
      country: req.body.country,
      sex: req.body.sex,
      profileImage,
      club: req.body.club,
      province: req.body.province,
      age: parseInt(req.body.age, 10),
      weight: parseInt(req.body.weight, 10),
      stance: req.body.stance,
      bio: req.body.bio,
      level: req.body.level,
      fightsWon: parseInt(req.body.fightsWon, 10),
      fightsLost: parseInt(req.body.fightsLost, 10),
      videoUrl: req.body.videoUrl,
    };

    const updatedBoxer = await prisma.boxer.update({
      where: { id: parseInt(id, 10) },
      data,
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

// GET distinct weights
exports.getDistinctWeights = async (req, res) => {
  try {
    // Using Prisma's groupBy to get unique weights
    const weights = await prisma.boxer.groupBy({
      by: ['weight'],
      orderBy: { weight: 'asc' },
    });
    res.json(weights.map((w) => w.weight));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching distinct weights.' });
  }
};

// GET distinct levels
exports.getDistinctLevels = async (req, res) => {
  try {
    const levels = await prisma.boxer.groupBy({
      by: ['level'],
      orderBy: { level: 'asc' },
    });
    res.json(levels.map((l) => l.level));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching distinct levels.' });
  }
};

// GET distinct clubs
exports.getDistinctClubs = async (req, res) => {
  try {
    const clubs = await prisma.boxer.groupBy({
      by: ['club'],
      orderBy: { club: 'asc' },
    });
    res.json(clubs.map((c) => c.club));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching distinct clubs.' });
  }
};
// GET distinct genders
exports.getDistinctGenders = async (req, res) => {
  try {
    const genders = await prisma.boxer.groupBy({
      by: ['sex'],
      orderBy: { sex: 'asc' },
    });
    res.json(genders.map((g) => g.sex));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching distinct genders.' });
  }
};
