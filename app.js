const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const productRouter = require('./routes/productRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();
// console.log(process.env.NODE_ENV);

// GLOBAL MIDDLEWARE
// Set security HTTP headers
app.use(helmet());

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser - reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XXS
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'cost',
      'price',
      'ratingsQuantity',
      'ratingsAverage',
      'medicinalProperties'
    ]
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Testing MW
app.use((req, res, next) => {
  console.log(
    'This is baby cakes completely useless middleware coming at you live scribe, do you dig it? 🕵️‍♀️'
  );
  next();
});

// Sets time of request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
