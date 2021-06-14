const express = require('express');
const herbController = require('./../controllers/herbController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(herbController.getAllHerbs)
  .post(authController.restrictTo('admin'), herbController.createHerb);

router
  .route('/:id')
  .get(herbController.getHerb)
  .patch(authController.restrictTo('admin'), herbController.updateHerb)
  .delete(authController.restrictTo('admin'), herbController.deleteHerb);

module.exports = router;
