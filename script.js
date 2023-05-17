const searchInput = document.getElementById('input-IP');
const searchArrow = document.querySelector('.arrow-icon-search');

searchArrow.addEventListener("click", () => {
    const searchIP = searchInput.value;    
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_xFe0shdqurLZab4XzRQAk1M3RE8jx&ipAddress=${searchIP}`
    getData(url);
})

// initialize the map and set its view to our chosen geographical coordinates and a zoom level
var map = L.map('map').setView([51.505, -0.09], 13);

// add a tile layer to add to our map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);


// Make an API request
function getData(url) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
        .catch((error) => console.log(error));
}

// my ip address
const myIP = '192.168.1.75'


