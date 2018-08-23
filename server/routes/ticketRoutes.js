const express = require('express');
const router = express.Router();

const requireLogin = require('../middlewares/requireLogin');
const ticketController = require('../controllers/ticketController');

router.get(
  '/newstart/pending',
  requireLogin,
  ticketController.getPendingNewStartsBulk
);
router.get('/newstart/gds', requireLogin, ticketController.getGDSNewStartsBulk);
router.get('/:id', requireLogin, ticketController.getTicketDetails);
router.get('/events/wch', requireLogin, ticketController.getWCHEventsBulk);

module.exports = router;
