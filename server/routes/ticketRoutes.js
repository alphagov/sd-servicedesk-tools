const express = require('express');
const router = express.Router();

const requireLogin = require('../middlewares/requireLogin');
const ticketController = require('../controllers/ticketController');

router.get(
  '/newstart/pending',
  requireLogin,
  ticketController.getPendingNewStarts
);
router.get('/:id', requireLogin, ticketController.getTicketDetails);

module.exports = router;
