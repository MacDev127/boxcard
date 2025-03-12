const express = require('express');
const router = express.Router();
const {
  createBoxer,
  getAllBoxers,
  getBoxerById,
  getBoxerByName,
  updateBoxer,
  deleteBoxer,
} = require('../controllers/boxerController');

router.post('/', createBoxer);
router.get('/', getAllBoxers);
router.get('/search', getBoxerByName);
router.get('/:id', getBoxerById);
router.put('/:id', updateBoxer);
router.delete('/:id', deleteBoxer);

module.exports = router;
