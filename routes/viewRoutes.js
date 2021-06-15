const express = require('express');
const viewController = require('../controllers/viewsController');

const router = express.Router();

// ROUTES

router.get('/overview', viewController.getOverview);
router.get('/product', viewController.getProduct);

module.exports = router;
