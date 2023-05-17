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

// initialize the map and set its view to a chosen geographical coordinates and a zoom level            
let map = L.map('map').setView([0, 0], 13);

// add a tile layer to add to our map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// define marker for map
var svgIcon = L.divIcon({
    html: `
    <svg xmlns="http://www.w3.org/2000/svg" 
    width="46" 
    height="56">
    <path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 
    39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 
    0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/></svg>`,
      className: "svg-icon",
      iconSize: [24, 24],
      iconAnchor: [12, 40],
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

        .catch((error) => console.log(error));
}