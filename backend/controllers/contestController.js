// controllers/contestController.js
const prisma = require('../config/db');

// GET /api/boxers/:id/contests?limit=5
exports.getContestsForBoxer = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const limit = parseInt(req.query.limit, 10) || 5;

  try {
    const fights = await prisma.contest.findMany({
      where: {
        OR: [{ boxer1Id: id }, { boxer2Id: id }],
      },
      orderBy: { date: 'desc' },
      take: limit,
      include: {
        boxer1: true,
        boxer2: true,
        winner: true,
      },
    });
    res.json(fights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching contests.' });
  }
};

// POST /api/contests
exports.createContest = async (req, res) => {
  const { date, result, boxer1Id, boxer2Id, winnerId, competition } = req.body;
  try {
    const fight = await prisma.contest.create({
      data: {
        date: new Date(date),
        result,
        competition,
        boxer1Id,
        boxer2Id,
        winnerId,
        competition,
      },
    });
    res.status(201).json(fight);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating contest.' });
  }
};
