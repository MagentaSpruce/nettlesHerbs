const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({
  mergeParams: true
});

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    reviewController.setProductUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(authController.protect, reviewController.getReview)
  .patch(authController.protect, reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
