const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name.'],
    unique: true,
    trim: true
  },
  cost: {
    type: Number,
    required: [true, 'A product must have a cost.']
  },
  medicinalProperties: {
    type: String,
    required: [true, 'A product must have at least one medicinal property']
  },
  amount: {
    type: String,
    required: [true, ' A product must have an amount']
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
    trim: true,
    required: [true, 'A product must have a description.']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A product must have a cover image.']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  storedAs: [String]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
