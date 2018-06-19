const axios = require('axios');
const keys = require('../config/keys');
const ticketURI = keys.whdURI + 'Tickets';

// I don't like this hard coded in.....but WHD API is a pain
// TODO set up a db collection to manage these qualifiers
const pendingQual = '((techGroupLevel.id=28)AND(statusTypeId=8))';
const gdsQual = '((techGroupLevel.id=28)AND(statusTypeId=17))';

module.exports = {
  getPendingNewStarts: async (req, res) => {
    const pendingStarts = await axios.get(ticketURI, {
      params: {
        qualifier: pendingQual,
        apiKey: req.user.apiKey
      }
    });

    res.send(pendingStarts.data);
  },

  getGDSNewStarts: async (req, res) => {
    const gdsStarts = await axios.get(ticketURI, {
      params: {
        qualifier: gdsQual,
        apiKey: req.user.apiKey
      }
    });

    res.send(gdsStarts.data);
  },

  getTicketDetails: async (req, res) => {
    const tktDB = await axios.get(`${ticketURI}/${req.params.id}`, {
      params: {
        apiKey: req.user.apiKey
      }
    });
    res.send(tktDB.data);
  }
};
