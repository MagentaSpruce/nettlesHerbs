const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get currently booked product
  const product = await Product.findById(req.params.productId);
  // 2) Create checkout session

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/product/${product.slug}`,
    client_reference_id: req.params.productId,
    line_items: [
      {
        name: `${product.name}`,
        description: product.summary,
        images: [],
        amount: product.price * 100,
        currency: 'usd',
        quantity: 1
      }
    ]
  });

  // 3) Send session to client as response
  res.status(200).json({
    status: 'success',
    session
  });
});
