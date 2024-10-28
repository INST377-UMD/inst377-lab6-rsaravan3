var map = L.map('map').setView([37.5, -95.7], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//getRandomInRange function
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

//Generate three random coordinates
const coordinates = [
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) },
];

function fetchLocation(lat, lng, markerId) {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const locality = data.locality;
            document.getElementById(markerId).innerHTML = `<h3>Marker ${markerId.replace('marker', '')}: Latitude: ${lat}, Longitude: ${lng}</h3> <p>Locality: ${locality}</p>`;
        });
}

//Add the physical markers to the map
coordinates.forEach((coord, index) => {
    const marker = L.marker([coord.lat, coord.lng]).addTo(map)
        .bindPopup(`Marker ${index + 1}`);
    
    fetchLocation(coord.lat, coord.lng, `marker${index + 1}`);
});
