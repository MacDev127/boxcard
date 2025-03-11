// src/routes/boxerRoutes.js
const express = require('express');
const router = express.Router();
const {
  createBoxer,
  getAllBoxers,
  getBoxerById,
  updateBoxer,
  deleteBoxer,
} = require('../controllers/boxerController');

// Example: Admin routes might require auth middleware
// const { verifyAdmin } = require('../middlewares/auth');

// Public or protected routes depending on your auth requirements:
router.post('/', /* verifyAdmin, */ createBoxer);
router.get('/', getAllBoxers);
router.get('/:id', getBoxerById);
router.put('/:id', /* verifyAdmin, */ updateBoxer);
router.delete('/:id', /* verifyAdmin, */ deleteBoxer);

module.exports = router;
