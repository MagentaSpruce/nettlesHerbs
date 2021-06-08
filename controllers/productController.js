const Product = require('./../models/productModel.js');

exports.getProduct = (req, res) => {
  //   console.log(req.params);
  // const id = req.params.id * 1;
  // const product = products.find(el => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     products: product
  //   }
  // });
};

exports.getAllProducts = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime
    // results: products.length,
    // data: { products: products }
  });
};

exports.createProduct = (req, res) => {};

exports.updateProduct = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      product: 'We will update you baby!'
    }
  });
};

exports.deleteProduct = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
