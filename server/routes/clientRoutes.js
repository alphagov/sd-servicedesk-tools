const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const clientController = require('../controllers/clientController');

router.get('/search', requireLogin, clientController.searchClients);

router.get('/:id', requireLogin, clientController.getClient);

module.exports = router;
