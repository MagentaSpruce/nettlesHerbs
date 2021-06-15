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

exports.getProduct = (req, res) => {
  res.status(200).render('_product', {
    title: 'Axnious Begone'
  });
};
