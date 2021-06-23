const multer = require('multer');
const sharp = require('sharp');
const Product = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadProductImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 4 }
]);

exports.resizeProductImages = catchAsync(async (req, res, next) => {
  // console.log(req.files);

  if (!req.files.imageCover || !req.files.images) return next();
  // 1) Cover image
  req.body.imageCover = `product-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/products/${req.body.imageCover}`);

  // 2) Other images
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `product-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/products/${filename}`);

      req.body.images.push(filename);
    })
  );
  next();
});

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
