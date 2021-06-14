const express = require('express');
const herbController = require('./../controllers/herbController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, herbController.getAllHerbs)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    herbController.createHerb
  );

router
  .route('/:id')
  .get(authController.protect, herbController.getHerb)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    herbController.updateHerb
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    herbController.deleteHerb
  );

module.exports = router;
