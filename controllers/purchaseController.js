const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('./../models/productModel');
const Purchase = require('./../models/purchaseModel');
const catchAsync = require('./../utils/catchAsync');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get current product
  const product = await Product.findById(req.params.productId);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // success_url: `${req.protocol}://${req.get('host')}/home/?product=${
    //   req.params.productId
    // }&price=${product.price}`,
    success_url: `${req.protocol}://${req.get('host')}/home`,
    cancel_url: `${req.protocol}://${req.get('host')}/product/${product.slug}`,
    client_reference_id: req.params.productId,
    line_items: [
      {
        name: `${product.name}`,
        description: product.summary,
        images: [
          `${req.protocol}://${req.get('host')}/img/products/${
            product.imageCover
          }`
        ],
        amount: product.price * 100,
        currency: 'usd',
        quantity: 1
      }
    ]
  });
  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session
  });
});

const createPurchaseCheckout = async session => {
  const product = session.client_reference_id;
  const price = session.display_items[0].amount / 100;
  await Purchase.create({ product, price });
};
exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout-session.completed')
    createPurchaseCheckout(event.data.object);

  res.status(200).json({ received: true });
};

// exports.createPurchaseCheckout = catchAsync(async (req, res, next) => {
//   // TEMPORARY CODE ---- INSECURE!!!!
//   const { product, price } = req.query;

//   if (!product && !price) return next();
//   await Purchase.create({ product, price });

//   res.redirect(req.originalUrl.split('?')[0]);
// });
