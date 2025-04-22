const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Define the storage configuration first
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists in your backend folder
  },
  filename: function (req, file, cb) {
    // Extract the file extension from the original file name
    const ext = path.extname(file.originalname);
    // Create a unique filename with the original extension
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

// Now create the multer upload middleware using the defined storage
const upload = multer({ storage: storage });

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
const { getContestsForBoxer } = require('../controllers/contestController');

// Use the multer middleware for the POST route
router.post('/', upload.single('profileImage'), createBoxer);
router.get('/', getAllBoxers);
router.get('/search', getBoxerByName);
router.get('/filters/weights', getDistinctWeights);
router.get('/filters/levels', getDistinctLevels);
router.get('/filters/clubs', getDistinctClubs);
router.get('/:id', getBoxerById);
router.get('/:id/contests', getContestsForBoxer);

router.put('/:id', updateBoxer);
router.delete('/:id', deleteBoxer);

module.exports = router;
