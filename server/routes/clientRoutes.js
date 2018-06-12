const axios = require('axios');
const requireLogin = require('../middlewares/requireLogin');
const util = require('util');

const keys = require('../config/keys');
const clientURI = keys.whdURI + 'Clients';

module.exports = app => {
  app.get('/api/whd/clients/search', requireLogin, async (req, res) => {
    let searchTerm = req.query.searchTerm;
    let searchString = `(firstName like '${searchTerm}*') or (lastName like '${searchTerm}*')`;

    console.log(req.user);

    const foundClients = await axios.get(clientURI, {
      params: {
        qualifier: searchString,
        apiKey: req.user.apiKey
      }
    });

    res.send(foundClients.data);
  });

  app.get('/api/whd/clients/:id', requireLogin, async (req, res) => {
    const foundClient = await axios.get(`${clientURI}/${req.params.id}`, {
      params: {
        apiKey: req.user.apiKey
      }
    });

    res.send(foundClient.data);
  });
};
