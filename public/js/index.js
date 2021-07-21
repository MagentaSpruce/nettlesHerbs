/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { makePurchase } from './stripe';
import { showAlert, hideAlert } from './alerts';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const purchaseBtn = document.getElementById('buyBtn');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  // console.log(locations);
  displayMap(locations);
}

purchaseBtn.addEventListener('click', e => {
  e.target.textContent = 'Processing...';
  const { productId } = e.target.dataset;
  makePurchase(productId);
});

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 10);
