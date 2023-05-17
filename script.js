const searchInput = document.getElementById('input-IP');
const searchArrow = document.querySelector('.arrow-icon-search');
const ipAddressDOM = document.getElementById('ip-address');
const countryDOM = document.getElementById('country');
const cityDOM = document.getElementById('city');
const postcodeDOM = document.getElementById('postcode');
const timezoneDOM = document.getElementById('timezone');
const ispDOM = document.getElementById('isp'); 


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


// fetching default IP address
fetch('https://api.ipify.org/?format=json')
  .then(response => response.json())
  .then(data => {
    const ipAddressDefault = data.ip;
    const urlDefault = `https://geo.ipify.org/api/v2/country,city?apiKey=at_xFe0shdqurLZab4XzRQAk1M3RE8jx&ipAddress=${ipAddressDefault}`
    getData(urlDefault)
  }) 
  .catch(error => console.error(error));


// make an API request
function getData(url) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let ipAddress = data.ip;
            let isp = data.isp;
            let { country, city, postalCode, timezone } = data.location
            ipAddressDOM.innerText = ipAddress;
            countryDOM.innerText = country;
            cityDOM.innerText = `${city},`;
            postcodeDOM.innerText = `${postalCode}`;
            timezoneDOM.innerText = `UCT ${timezone}`;
            ispDOM.innerText = isp;
        })
        .catch((error) => console.log(error));
}





