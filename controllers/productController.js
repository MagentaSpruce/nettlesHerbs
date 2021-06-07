const fs = require('fs');

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/product-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`The product id is ${val}`);
  if (req.params.id * 1 > products.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Shit got fucked',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.cost) {
    return res.status(404).json({
      status: 'Fail',
      message: 'ruh roh, missing name or cost!',
    });
  }
  next();
};

exports.getProduct = (req, res) => {
  //   console.log(req.params);

  const id = req.params.id * 1;

  const product = products.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      products: product,
    },
  });
};

exports.getAllProducts = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: products.length,
    data: { products: products },
  });
};

exports.createProduct = (req, res) => {
  //   console.log(req.body);
  const newId = products[products.length - 1].id + 1;
  const newProduct = Object.assign({ id: newId }, req.body);
  products.push(newProduct);

  fs.writeFile(
    `${__dirname}/dev-data/data/product-simple.json`,
    JSON.stringify(products),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          product: newProduct,
        },
      });
    }
  );
};

exports.updateProduct = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      product: 'We will update you baby!',
    },
  });
};

exports.deleteProduct = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
