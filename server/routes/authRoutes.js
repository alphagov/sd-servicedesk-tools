const passport = require('passport');
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

const requireLogin = require('../middlewares/requireLogin');

router.get('/', passport.authenticate('whd'), authController.authenticateUser);

router.get('/logout', authController.logoutUser);

router.get('/current_tech', authController.currentUser);

router.post('/enrol_tech', requireLogin, authController.enrolUser);

module.exports = router;
