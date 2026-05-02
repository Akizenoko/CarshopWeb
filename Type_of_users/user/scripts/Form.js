// ---------- COST CALCULATION ENGINE (PHP) ----------
// Exchange rate: 1 USD = 56 PHP (adjust as needed)
const USD_TO_PHP = 56;

// Base service costs in USD
const servicePricesUSD = {
    flat_tire: 25,
    battery: 20,
    engine_repair: 200,
    oil_change: 45,
    other: 70
};

// Vehicle extra fees in USD
const vehicleExtraMapUSD = {
    sedan: 0,
    SportsCar: 15,
    hatchback: 0,
    suv: 12,
    pickup: 18,
    van: 18,
    motorcycle: 0,
    truck: 40,
    electric: 8
};

// Helper: convert USD to PHP and format
function toPHP(usd) {
    return (usd * USD_TO_PHP).toFixed(2);
}

// DOM elements
const serviceSelect = document.getElementById('serviceType');
const vehicleSelect = document.getElementById('vehicleType');
const rushCheckbox = document.getElementById('rushCheckbox');
const serviceCostSpan = document.getElementById('serviceCost');
const vehicleExtraSpan = document.getElementById('vehicleExtra');
const rushFeeSpan = document.getElementById('rushFee');
const totalCostSpan = document.getElementById('totalCost');

function updateCost() {
    const service = serviceSelect.value;
    let baseUSD = servicePricesUSD[service] || 45;
    const vehicle = vehicleSelect.value;
    let vehicleExtraUSD = vehicleExtraMapUSD[vehicle] || 0;
    let subtotalUSD = baseUSD + vehicleExtraUSD;
    let rushFeeUSD = rushCheckbox.checked ? subtotalUSD * 0.30 : 0;
    let totalUSD = subtotalUSD + rushFeeUSD;
    
    // Convert to PHP
    serviceCostSpan.innerText = `₱${toPHP(baseUSD)}`;
    vehicleExtraSpan.innerText = `₱${toPHP(vehicleExtraUSD)}`;
    rushFeeSpan.innerText = `₱${toPHP(rushFeeUSD)}`;
    totalCostSpan.innerText = `₱${toPHP(totalUSD)}`;
}

serviceSelect.addEventListener('change', updateCost);
vehicleSelect.addEventListener('change', updateCost);
rushCheckbox.addEventListener('change', updateCost);
updateCost();

// ----- MAP & LOCATION FEATURES (Leaflet) -----
let mapInstance;
let marker;

function initMap(lat = 14.5995, lng = 120.9842) {
    if (mapInstance) {
        mapInstance.setView([lat, lng], 13);
        if (marker) marker.setLatLng([lat, lng]);
        else marker = L.marker([lat, lng]).addTo(mapInstance);
    } else {
        mapInstance = L.map('map').setView([lat, lng], 13);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> & CartoDB'
        }).addTo(mapInstance);
        marker = L.marker([lat, lng]).addTo(mapInstance);
    }
    fetchLocationName(lat, lng);
}

function fetchLocationName(lat, lng) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
        .then(res => res.json())
        .then(data => {
            const address = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
            document.getElementById('location').value = address.substring(0, 100);
        })
        .catch(() => {
            document.getElementById('location').value = `${lat.toFixed(5)}, ${lng.toFixed(5)} (approx)`;
        });
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            initMap(lat, lng);
        }, () => {
            alert("Could not get location. Using default.");
            initMap();
        });
    } else {
        alert("Geolocation not supported");
        initMap();
    }
}

// "Use My Address" button
document.getElementById('useAddressBtn').addEventListener('click', () => {
    document.getElementById('location').value = "Mayor Jaldon St, Canelar, Zamboanga City";
});

document.getElementById('currentLocationBtn').addEventListener('click', () => {
    getCurrentLocation();
});

// Saved phone number
document.getElementById('useSavedPhoneBtn').addEventListener('click', () => {
    let savedPhone = localStorage.getItem('userPhone');
    if (!savedPhone) {
        savedPhone = "09171234567";
        localStorage.setItem('userPhone', savedPhone);
    }
    document.getElementById('phoneNumber').value = savedPhone;
});

const phoneInput = document.getElementById('phoneNumber');
phoneInput.addEventListener('change', () => {
    if (phoneInput.value.trim().length >= 10)
        localStorage.setItem('userPhone', phoneInput.value.trim());
});

// Initialize map on load
window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            initMap(pos.coords.latitude, pos.coords.longitude);
        }, () => initMap());
    } else {
        initMap();
    }
});

// Placeholder hint for "Other" service
const detailsTextarea = document.getElementById('issueDetails');
serviceSelect.addEventListener('change', () => {
    if (serviceSelect.value === 'other') {
        detailsTextarea.placeholder = "Please describe the exact issue (e.g., strange noise, overheating)";
    } else {
        detailsTextarea.placeholder = "Describe Issue";
    }
    updateCost();
});