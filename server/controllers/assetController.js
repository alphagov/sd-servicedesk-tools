const axios = require('axios');
const keys = require('../config/keys');
const assetURI = keys.whdURI + 'Assets';
const assetStatusURI = keys.whdURI + 'AssetStatuses';
const assetLocationsURI = keys.whdURI + 'Locations';
const assetRoomsURI = keys.whdURI + 'Rooms';

module.exports = {
  getAssetDetails: async (req, res) => {
    const assetDetail = await axios.get(`${assetURI}/${req.query.assetId}`, {
      params: {
        apiKey: req.user.apiKey
      }
    });

    res.send(assetDetail.data);
  },

  getClientAssetList: async (req, res) => {
    let searchString = `(clients.userName like '${req.query.userName}')`;

    const clientAssets = await axios.get(assetURI, {
      params: {
        qualifier: searchString,
        apiKey: req.user.apiKey
      }
    });

    res.send(clientAssets.data);
  },
  updateClientAssetList: async (req, res) => {
    const { assetId, client } = req.body.data;
    // issue here is trying to assign an asset to a deleted person
    // need to catch this error
    try {
      const unAssign = await axios.put(
        `${assetURI}/${assetId}?apiKey=${req.user.apiKey}`,
        { clients: client },
        { headers: { 'content-type': 'application/json' } }
      );
      let unAssy = { status: unAssign.status, reason: 'Asset Clients updated' };
      res.send(unAssy);
    } catch (error) {
      // console.log(error.response.data);
      let unAssyError = {
        status: error.response.status,
        reason: error.response.data
      };
      res.send(unAssyError);
    }
  },
  searchAssets: async (req, res) => {
    let searchString = `(assetNumber like '${req.query.searchTerm}')`;

    const searchAssets = await axios.get(assetURI, {
      params: {
        qualifier: searchString,
        apiKey: req.user.apiKey
      }
    });

    res.send(searchAssets.data);
  },
  getAssetRooms: async (req, res) => {
    const assetRoom = await axios.get(assetRoomsURI, {
      params: {
        apiKey: req.user.apiKey
      }
    });
    res.send(assetRoom.data);
  },
  addAssetRooms: async (req, res) => {
    const { id, type, roomName, assetId } = req.body;
    let newR = {
      id,
      type,
      roomName
    };

    const newAssRoom = await axios.put(
      `${assetURI}/${assetId}?apiKey=${req.user.apiKey}`,
      { room: newR },
      { headers: { 'content-type': 'application/json' } }
    );
    res.sendStatus(newAssRoom.status);
  },
  getAssetLocations: async (req, res) => {
    const assetLoc = await axios.get(assetLocationsURI, {
      params: {
        apiKey: req.user.apiKey
      }
    });
    res.send(assetLoc.data);
  },
  addAssetLocations: async (req, res) => {
    const newLoc = req.body;
    // get the new full location details for the locId
    const locDetails = await axios.get(`${assetLocationsURI}/${newLoc.locId}`, {
      params: {
        apiKey: req.user.apiKey
      }
    });
    const {
      id,
      type,
      address,
      city,
      locationName,
      postalCode,
      state,
      defaultPriorityTypeId
    } = locDetails.data;
    const newLocFull = {
      id,
      type,
      address,
      city,
      locationName,
      postalCode,
      state,
      defaultPriorityTypeId
    };
    // update the asset
    const newAssetLoc = await axios.put(
      `${assetURI}/${newLoc.assetId}?apiKey=${req.user.apiKey}`,
      { location: newLocFull },
      { headers: { 'content-type': 'application/json' } }
    );
    // send back to client
    res.send(newAssetLoc.data);
  },
  getAssetStatus: async (req, res) => {
    const assetStatus = await axios.get(assetStatusURI, {
      params: {
        apiKey: req.user.apiKey
      }
    });
    res.send(assetStatus.data);
  },
  updateAssetStatus: async (req, res) => {
    const { assetId, statusId } = req.body.data;

    const statChange = await axios.put(
      `${assetURI}/${assetId}?apiKey=${req.user.apiKey}`,

      { assetstatus: { id: statusId } },
      { headers: { 'content-type': 'application/json' } }
    );
    res.sendStatus(statChange.status);
  },
  updateAssetReservable: async (req, res) => {
    const { assetId, isRes } = req.body;
    const resChange = await axios.put(
      `${assetURI}/${assetId}?apiKey=${req.user.apiKey}`,
      { isReservable: isRes },
      { headers: { 'content-type': 'application/json' } }
    );
    res.sendStatus(resChange.status);
  }
};
