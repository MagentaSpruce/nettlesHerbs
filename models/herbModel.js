const mongoose = require('mongoose');

const herbSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An herb must have a name.']
    },
    latin: {
      type: String,
      required: [true, 'An herb must have a scientific name.']
    },
    photo: {
      type: String,
      required: [true, 'An herb must have a picture.']
    }
    // product: {
    //   type: mongoose.Schema.ObjectId
    //   // ref: 'Product',
    //   // required: [true, 'Herb must belong to a product.']
    // }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
herbSchema.index({ location: '2dsphere' });
const Herb = mongoose.model('Herb', herbSchema);

module.exports = Herb;
