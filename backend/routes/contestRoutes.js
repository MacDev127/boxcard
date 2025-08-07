// routes/contestRoutes.js
const express = require('express');
const router = express.Router();
const {
  createContest,
  updateContest,
  deleteContest,
} = require('../controllers/contestController');

router.post('/', createContest);
// …PUT, DELETE, GET all…
module.exports = router;
