const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const nodemailer = require('nodemailer');
const compression = require('compression');
// const csp = require('express-csp');
const cors = require('cors');
const bodyParser = require('body-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const productRouter = require('./routes/productRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const reviewRouter = require('./routes/reviewRoutes');
const purchaseRouter = require('./routes/purchaseRoutes');
const purchaseController = require('./controllers/purchaseController');
const herbRouter = require('./routes/herbRoutes');

const viewRouter = require('./routes/viewRoutes');

const app = express();
// console.log(process.env.NODE_ENV);
app.enable('trust proxy');

// VIEW ENGINE SETUP
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// GLOBAL MIDDLEWARE
//Implement CORS - access-control-allow-origin, allows sharing of API
app.use(cors());

app.options('*', cors());

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

app.post(
  '/webhook-checkout',
  bodyParser.raw({ type: 'application/json' }),
  purchaseController.webhookCheckout
);

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

app.use(compression());

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
  // console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tristanettles@gmail.com',
      pass: process.env.GOOGLE_PASSWORD
    }
  });

  const mailOptions = {
    from: req.body.email,
    to: 'tristanettles@gmail.com',
    subject: `You have a contact request from ${req.body.name}`,
    text: `${
      req.body.name
    } has sent you a contact request sister. So, you should email them back at ${
      req.body.email
    } to see what the business iz ya dig? 🤙🦐🛡`
  };

  // eslint-disable-next-line no-unused-vars
  transporter.sendMail(mailOptions, (error, _) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } else {
      // eslint-disable-next-line no-console
      // console.log('Email sent successfully.');
      res.send('success');
    }
  });
});

app.use('/', viewRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/herbs', herbRouter);
app.use('/api/v1/purchases', purchaseRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
