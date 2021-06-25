/* eslint-disable */
import axios from 'axios';
const stripe = Stripe(
  'pk_test_51J6EUWLhSy5ppJbLZSsRtVXXwZ29dJMvnwL7Uf0MEefrAHdQVD8XXZW2FGvvShMJTVQ6HwAYOzCMPXUqncaK5dOI00ntqw76Sh'
);

export const buyProduct = async productId => {
  // 1) Get checkout session from API
  const session = await axios(
    `http://127.0.0.1:3000/api/v1/products/checkout-session/${productId}`
  );
  console.log(session);
  // 2) Use Stripe object to create checkout form + charge credit card
};
