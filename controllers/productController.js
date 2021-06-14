const Product = require('./../models/productModel');

const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.aliasTopProducts = (req, res, next) => {
  req.query.limit = '3';
  req.query.sort = '-ratingsAverage';
  req.query.fields =
    'name,price,ratingsAverage,summary,medicinalProperties,amount';
  next();
};

exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product, { path: 'reviews' });
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
// BEFORE factory function:
// exports.deleteProduct = catchAsync(async (req, res, next) => {
//   const product = await Product.findByIdAndDelete(req.params.id);

//   if (!product) {
//     return next(new AppError('No product found with that ID', 404));
//   }
//   res.status(204).json({
//     status: 'success',
//     data: null
//   });
// });

exports.getProductStats = catchAsync(async (req, res, next) => {
  const stats = await Product.aggregate([
    { $match: { ratingAverage: { $gte: 4.5 } } },
    {
      $group: {
        _id: '$ratingAverage',
        numProducts: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});
