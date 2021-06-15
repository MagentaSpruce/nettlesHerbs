const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Herb = require('./../models/herbModel');
const factory = require('./handlerFactory');

exports.getAllHerbs = factory.getAll(Herb);
exports.createHerb = factory.createOne(Herb);
exports.deleteHerb = factory.deleteOne(Herb);
exports.updateHerb = factory.updateOne(Herb);
exports.getHerb = factory.getOne(Herb);

// exports.deleteHerb = catchAsync(async (req, res, next) => {
//   const deletedHerb = await Herb.findByIdAndDelete(req.params.id);

//   if (!deletedHerb) {
//     return next(new AppError('No herb found with that ID', 404));
//   }
//   res.status(204).json({
//     status: 'success',
//     data: null
//   });
// });

exports.getHerbsWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitude and longitude in the format lat, lng.',
        400
      )
    );
  }
  //   console.log(distance, lat, lng, unit);
  const herbs = await Herb.find({
    locations: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });
  res.status(200).json({
    status: 'success',
    results: herbs.length,
    data: {
      data: herbs
    }
  });
});
