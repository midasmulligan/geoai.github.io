var typed = require('./typed');
var leaflet = require('leaflet');

typed();


var mymap = leaflet.map('hero-map', {
  attributionControl: false,
  zoomControl: false,
}).setView([51.505, -0.09], 13);

leaflet.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2FzaGltaWkiLCJhIjoiY2llc3pleTQ3MDBrcHFhbTNjbmRnZjdpbyJ9.DGX7v39rkSvNnH9SrOvUaw', {
    attribution: '',
    maxZoom: 18,
}).addTo(mymap);
