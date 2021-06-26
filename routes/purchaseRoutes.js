const express = require('express');
const purchaseController = require('./../controllers/purchaseController');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

router.use(viewsController.alerts);

router.get(
  '/checkout-session/:productId',
  purchaseController.getCheckoutSession
);

module.exports = router;
