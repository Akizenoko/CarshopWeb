let map = L.map('map').setView([14.5995, 120.9842], 13); // Default: Manila

// Map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let marker;

// Get user location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation not supported.");
    }
}

// Show position on map
function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    document.getElementById("location").value = lat + ", " + lon;

    map.setView([lat, lon], 15);

    if (marker) {
        map.removeLayer(marker);
    }

    marker = L.marker([lat, lon]).addTo(map)
        .bindPopup("You are here")
        .openPopup();
}

// Error handler
function showError(error) {
    alert("Location access denied.");
}