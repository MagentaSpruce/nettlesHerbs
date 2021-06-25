const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const nodemailer = require('nodemailer');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const productRouter = require('./routes/productRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const reviewRouter = require('./routes/reviewRoutes');
const herbRouter = require('./routes/herbRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();
// console.log(process.env.NODE_ENV);

// VIEW ENGINE SETUP
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// GLOBAL MIDDLEWARE
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

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
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XXS
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'makeUp',
      'price',
      'ratingsQuantity',
      'ratingsAverage',
      'medicinalProperties'
    ]
  })
);

// Testing MW
app.use((req, res, next) => {
  // eslint-disable-next-line no-console
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

app.post('/home', (req, res) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: req.body.email,
    to: process.env.EMAIL_USERNAME,
    subject: `You have a contact request from ${req.body.name}`,
    text: `${
      req.body.name
    } has sent you a contact request sister. So, you should email them back at ${
      req.body.email
    } to see what the business iz ya dig? 🤙🦐🛡`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Your mail had a problem being sent. Please try back later.');
    } else {
      console.log('Email sent successfully.');
      res.send('success');
    }
  });
});
app.use('/', viewRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/herbs', herbRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
