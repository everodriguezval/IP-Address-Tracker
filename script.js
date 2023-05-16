const searchInput = document.getElementById('input-IP');
const searchArrow = document.querySelector('.arrow-icon-search');

searchInput.addEventListener("input", (e) => {
    console.log(e.target.value)
})
searchArrow.addEventListener("click", () => {
    console.log('Arrow clicked')
})

// initialize the map and set its view to our chosen geographical coordinates and a zoom level
var map = L.map('map').setView([51.505, -0.09], 13);

// add a tile layer to add to our map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);