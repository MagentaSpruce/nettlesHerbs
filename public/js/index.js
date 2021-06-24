/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';

// DOM ELEMENTS
const mapBox = document.getElementById('map');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  // console.log(locations);
  displayMap(locations);
}
