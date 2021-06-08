const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name.'],
    unique: true
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A product must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, ' A product must have a difficulty']
  },
  ratingAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price.']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
