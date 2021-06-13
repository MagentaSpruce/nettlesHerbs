const express = require('express');
const herbController = require('./../controllers/herbController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(herbController.getAllHerbs)
  .post(authController.protect, herbController.createHerb);

router
  .route('/:id')
  .get(herbController.getHerb)
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
