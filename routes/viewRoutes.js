const express = require('express');

const viewController = require('../controllers/viewsController');

const router = express.Router();

// ROUTES

router.get(
  '/',
  // purchaseController.createPurchaseCheckout,
  viewController.getHome
);
router.get(
  '/home',
  // purchaseController.createPurchaseCheckout,
  viewController.getHome
);

router.get('/about', viewController.getAbout);
router.get('/products', viewController.getOverview);
router.get('/product/:slug', viewController.getProduct);

module.exports = router;
