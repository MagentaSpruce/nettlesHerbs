/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { buyProduct } from './stripe';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const buyBtn = document.getElementById('buy-product');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  // console.log(locations);
  displayMap(locations);
}

buyBtn.addEventListener('click', e => {
  e.target.textContent = 'Processing...';
  const productId = e.target.dataset.productId;
  buyProduct(productId);
});
