const express = require('express');
const herbController = require('./../controllers/herbController');
const router = express.Router();

router
  .route('/')
  .get(herbController.getAllHerbs)
  .post(herbController.createHerb);
router
  .route('/:id')
  .get(herbController.getHerb)
  .patch(herbController.updateHerb)
  .delete(herbController.deleteHerb);

module.exports = router;
