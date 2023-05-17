const searchInput = document.getElementById('input-IP');
const searchBtn = document.querySelector('.search-button');
const ipAddressDOM = document.getElementById('ip-address');
const countryDOM = document.getElementById('country');
const cityDOM = document.getElementById('city');
const postcodeDOM = document.getElementById('postcode');
const timezoneDOM = document.getElementById('timezone');
const ispDOM = document.getElementById('isp'); 
const form = document.querySelector('.form-search-container')

searchBtn.addEventListener("click", () => {
    const searchIP = searchInput.value;    
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_xFe0shdqurLZab4XzRQAk1M3RE8jx&ipAddress=${searchIP}`
    getData(url);
})

form.addEventListener('submit', (event) => {event.preventDefault()});

//conf map
let mapConfig = {
  minZoom: 4,
  maxZoom: 18,
  zoom: 16,
  zoomControl: false
}

// initialize the map and set its view to a chosen geographical coordinates and a zoom level   
let map = L.map('map', mapConfig).setView([0, 0], 13);

// add a tile layer to add to our map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// define marker for map
let svgIcon = L.icon({
  iconUrl: 'images/icon-location.svg'
});

// fetching default IP address
fetch('https://api.ipify.org/?format=json')
  .then(response => response.json())
  .then(data => {
    const ipAddressDefault = data.ip;
    const urlDefault = `https://geo.ipify.org/api/v2/country,city?apiKey=at_xFe0shdqurLZab4XzRQAk1M3RE8jx&ipAddress=${ipAddressDefault}`
    getData(urlDefault)
  }) 
  .catch(error => console.error(error));


// function to make API requests
function getData(url) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let ipAddress = data.ip;
            let isp = data.isp;
            let { country, city, postalCode, timezone, lat, lng } = data.location
            ipAddressDOM.innerText = ipAddress;
            countryDOM.innerText = country;
            cityDOM.innerText = `${city},`;
            if (postalCode == "") {
            } else {
                postcodeDOM.innerText = `, ${postalCode}`;
            }           
            timezoneDOM.innerText = `UCT ${timezone}`;
            ispDOM.innerText = isp;
          
            // Set the map view to the IP address location
            map.setView([lat, lng], 13);

            // Add a marker to the map at the IP address location
            L.marker([lat, lng], {icon: svgIcon}).addTo(map);
        })

        .catch((error) => {
          alert('Enter a valid IP')
          console.log(error)});
}