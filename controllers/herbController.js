const catchAsync = require('../utils/catchAsync');
const Herb = require('./../models/herbModel');
const AppError = require('./../utils/appError');

exports.getAllHerbs = catchAsync(async (req, res, next) => {
  const herbs = await Herb.find();

  res.status(200).json({
    status: 'success',
    results: herbs.length,
    data: {
      herbs
    }
  });
});

exports.createHerb = catchAsync(async (req, res, next) => {
  const newHerb = await Herb.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      herb: newHerb
    }
  });
});

exports.deleteHerb = catchAsync(async (req, res, next) => {
  const deletedHerb = await Herb.findByIdAndDelete(req.params.id);

  if (!deletedHerb) {
    return next(new AppError('No herb found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.updateHerb = catchAsync(async (req, res, next) => {
  const herb = await Herb.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!herb) {
    return next(new AppError('No herb found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      //property name has same name as the value
      herb
    }
  });
});

exports.getHerb = catchAsync(async (req, res, next) => {
  const herb = await Herb.findById(req.params.id);

  if (!herb) {
    return next(new AppError('No Herb found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      herb
    }
  });
});
