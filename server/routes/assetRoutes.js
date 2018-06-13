const express = require('express');
const router = express.Router();

const requireLogin = require('../middlewares/requireLogin');
const assetController = require('../controllers/assetController');

router.get('/details', requireLogin, assetController.getAssetDetails);

router.get('/client', requireLogin, assetController.getClientAssetList);
router.put('/client', requireLogin, assetController.updateClientAssetList);

router.get('/search', requireLogin, assetController.searchAssets);

router.get('/rooms', requireLogin, assetController.getAssetRooms);

router.post('/rooms', requireLogin, assetController.addAssetRooms);

router.get('/locations', requireLogin, assetController.getAssetLocations);

router.post('/location', requireLogin, assetController.addAssetLocations);

router.get('/status', requireLogin, assetController.getAssetStatus);

router.put('/status', requireLogin, assetController.updateAssetStatus);

router.put('/reservable', requireLogin, assetController.updateAssetReservable);

module.exports = router;
