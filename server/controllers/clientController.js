const axios = require('axios');
const keys = require('../config/keys');
const clientURI = keys.whdURI + 'Clients';

module.exports = {
  searchClients: async (req, res) => {
    let searchTerm = req.query.searchTerm;
    let searchString = `(firstName like '${searchTerm}*') or (lastName like '${searchTerm}*')`;

    const foundClients = await axios.get(clientURI, {
      params: {
        qualifier: searchString,
        apiKey: req.user.apiKey
      }
    });

    res.send(foundClients.data);
  },
  getClient: async (req, res) => {
    const foundClient = await axios.get(`${clientURI}/${req.params.id}`, {
      params: {
        apiKey: req.user.apiKey
      }
    });

    res.send(foundClient.data);
  }
};
