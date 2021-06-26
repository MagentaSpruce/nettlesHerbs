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

exports.getHome = catchAsync(async (req, res) => {
  res.status(200).render('home', {
    title: 'Home Page'
  });
});

exports.getAbout = catchAsync(async (req, res) => {
  res.status(200).render('about', {
    title: 'About us'
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
      "default-src 'self' https://*.mapbox.com https://js.stripe.com/v3/;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://js.stripe.com/v3/ https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('_product', {
      title: `${product.name}`,
      product
    });
});
