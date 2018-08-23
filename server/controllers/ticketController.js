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

  getPendingNewStartsBulk: async (req, res) => {
    const pendingStarts = await axios.get(ticketURI, {
      params: {
        qualifier: pendingQual,
        apiKey: req.user.apiKey
      }
    });
    const startTickets = [];
    if (pendingStarts.data.length > 0) {
      for (let x in pendingStarts.data) {
        const starter = await getTicketDetailsBulk(
          pendingStarts.data[x].id,
          req.user.apiKey
        );
        startTickets.push(starter);
      }
    }
    res.send(startTickets);
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
  getGDSNewStartsBulk: async (req, res) => {
    const gdsStarts = await axios.get(ticketURI, {
      params: {
        qualifier: gdsQual,
        apiKey: req.user.apiKey
      }
    });

    const startTickets = [];
    if (gdsStarts.data.length > 0) {
      for (let x in gdsStarts.data) {
        const starter = await getTicketDetailsBulk(
          gdsStarts.data[x].id,
          req.user.apiKey
        );
        startTickets.push(starter);
      }
    }
    res.send(startTickets);
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

getTicketDetailsBulk = async (id, apiKey) => {
  const tktDB = await axios.get(`${ticketURI}/${id}`, {
    params: {
      apiKey
    }
  });
  return tktDB.data;
};
