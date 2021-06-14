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
