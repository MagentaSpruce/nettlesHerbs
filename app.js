const express = require('express');
const morgan = require('morgan');

const productRouter = require('./routes/productRoutes');
const herbRouter = require('./routes/herbRoutes');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log(
    'This is baby cakes coming at you live scribe, do you dig it? 🕵️‍♀️'
  );
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/products', productRouter);
app.use('/api/v1/herbs', herbRouter);

module.exports = app;
