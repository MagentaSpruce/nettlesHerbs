const AppError = require('../utils/appError');
const Product = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  // 1) Get product data from collection
  const products = await Product.find();
  // 2) Build template

  // 3) Render template using product data from step 1
  res.status(200).render('_overview', {
    title: 'All Products',
    products
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!product) {
    return next(
      new AppError(
        'The problem is that there is no product with that name!',
        404
      )
    );
  }

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      'connect-src https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com'
    )
    .render('_product', {
      title: `${product.name}`,
      product
    });
});
