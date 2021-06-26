const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Purchase must belong to a product']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: true
  }
});

purchaseSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'product',
    select: 'name'
  });
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
