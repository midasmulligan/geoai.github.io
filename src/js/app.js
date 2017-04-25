var typed = require('./typed');
var leaflet = require('leaflet');
var sampleData = require('./sampleData.json');
import BlogRoll from './blogroll.inferno';
import Inferno from 'inferno';

var axios = require('axios');

typed();


var map = leaflet.map('hero-map', {
  attributionControl: false,
  zoomControl: false,
}).setView([35, -30], 3);

leaflet.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2FzaGltaWkiLCJhIjoiY2llc3pleTQ3MDBrcHFhbTNjbmRnZjdpbyJ9.DGX7v39rkSvNnH9SrOvUaw', {
    attribution: '',
    maxZoom: 18,
    continuousWorld: false,
}).addTo(map);

// Define an icon called pulseRing
var pulseRing = leaflet.divIcon({
  // Specify a class name we can refer to in CSS.
  className: 'pulse-ring',
  html: '<div class="gps_ring"></div>'
  // Set marker width and height
  ,iconSize: [22,22]
  // ,iconAnchor: [11,11]
});

var listOfLocations = {
  toronto: [44.5, -79.5],
  nyc: [40.5, -75.5],
  uk: [53.5, 0],
}
//
// Object.keys(listOfLocations).forEach((location) => {
//   leaflet.marker(listOfLocations[location], {icon: pulseRing}).addTo(map);
// });
let gdeltTheme= 'LEGISLATION';
axios.get('http://tps-qgs.herokuapp.com/api/gdelt/' + gdeltTheme)
  .then((res) => {
    const data = res.data;
    let markerGroup = leaflet.layerGroup().addTo(map);

    data.forEach((marker, index, array) => {
      if(index % 20 === 0) {
        leaflet.marker(marker, {icon: pulseRing}).addTo(markerGroup);
      }
    });

  })
let markers = sampleData.features.map((feature) => {
  return feature.geometry.coordinates;
  // leaflet.marker(feature.geometry.coordinates, {icon: pulseRing}).addTo(map);
});
let markerGroup = leaflet.layerGroup().addTo(map);

markers.forEach((marker, index, array) => {
  if(index % 9 === 0) {
    leaflet.marker(marker, {icon: pulseRing}).addTo(markerGroup);
  }
});

Inferno.render(
  <BlogRoll userName="the-fence-post"/>,
  document.getElementById("blogroll")
);
