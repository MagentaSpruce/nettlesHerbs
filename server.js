const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('DB connection is successful! 💋'));

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name.'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price.']
  }
});

const Product = mongoose.model('Product', productSchema);
const testProduct2 = new Product({
  name: 'The Herb2',
  price: 9
});

testProduct2
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log('error 😒', err);
  });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}.`);
});
