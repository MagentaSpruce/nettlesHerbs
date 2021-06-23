/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibWFnZW50YXNwcnVjZSIsImEiOiJja29sbDVpNTYxbmFxMndwbjZnaXN0OXdzIn0.fc63_3pVYyGH3Zl1eAU09A';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/magentaspruce/ckpzxgp6r2hpe18l738oxqybd',
    scrollZoom: false
    //   center: [-81.6557, 30.3322],
    //   zoom: 10
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
      closeOnClick: false
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
