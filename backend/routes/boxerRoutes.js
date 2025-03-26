// src/routes/boxerRoutes.js
const express = require('express');
const router = express.Router();
const {
  createBoxer,
  getAllBoxers,
  getBoxerById,
  getBoxerByName,
  updateBoxer,
  deleteBoxer,
  getDistinctWeights,
  getDistinctLevels,
  getDistinctClubs,
} = require('../controllers/boxerController');

router.post('/', createBoxer);
router.get('/', getAllBoxers);
router.get('/search', getBoxerByName);
router.get('/filters/weights', getDistinctWeights);
router.get('/filters/levels', getDistinctLevels);
router.get('/filters/clubs', getDistinctClubs);
router.get('/:id', getBoxerById);
router.put('/:id', updateBoxer);
router.delete('/:id', deleteBoxer);

module.exports = router;
