const mongoose = require('mongoose');

const herbSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An herb must have a name.']
  },
  photo: String
});

const Herb = mongoose.model('Herb', herbSchema);

module.exports = Herb;
