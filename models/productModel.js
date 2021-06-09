const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name.'],
    unique: true,
    trim: true,
    maxlength: [40, 'A product name must have less or equal to 40 characters.'],
    minlength: [7, 'A product name must have more or equal to 7 characters.']
  },
  slug: String,
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
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0']
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
    default: Date.now(),
    select: false
  },
  storedAs: [String]
});

//DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//QUERY MIDDLEWARE

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
