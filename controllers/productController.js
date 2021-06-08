const Product = require('./../models/productModel');

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    //BUILD QUERY
    //1. Filtering
    const queryObj = { ...req.query };
    const excludedField = ['page', 'sort', 'limit', 'fields'];
    excludedField.forEach(el => delete queryObj[el]);

    //2.Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|le)\b/g, match => `$${match}`);
    // console.log(JSON.parse(queryStr));
    // console.log(req.query, queryObj);
    const query = Product.find(JSON.parse(queryStr));

    // console.log(req.query);
    //EXECUTE QUERY
    const products = await query;

    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: { products: products }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
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
      message: err
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        //property name has same name as the value
        product: product
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
