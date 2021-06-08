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

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: { products: products }
  });
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

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
