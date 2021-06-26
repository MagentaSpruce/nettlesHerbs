/* eslint-disable */
import axios from 'axios';

export const makePurchase = async productId => {
  const stripe = Stripe(
    'pk_test_51J6EUWLhSy5ppJbLZSsRtVXXwZ29dJMvnwL7Uf0MEefrAHdQVD8XXZW2FGvvShMJTVQ6HwAYOzCMPXUqncaK5dOI00ntqw76Sh'
  );
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `/api/v1/purchases/checkout-session/${productId}`
    );
    // console.log(session);

    // 2) Create checkout form + charge CC using Stripe
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log('Check the console.log Jack 🆔🥶❄');
  }
};
