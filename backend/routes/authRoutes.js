const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();
const {
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
module.exports = router;
