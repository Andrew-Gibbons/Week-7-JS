let url = "https://api.wheretheiss.at/v1/satellites/25544"

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let timeIssLocationFetched = document.querySelector('#time')

let map = L.map('iss-map').setView([0, 0], 1)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
let update = 1000 // 10 Seconds
let maxFailedAttempts = 3
let issMarker // Leaflet marker
let icon = L.icon({
    iconUrl: 'nouniss.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25]
})

iss (maxFailedAttempts) // Call the function one time to start
// setInterval(iss, update)
function iss(attempts) {
    if (attempts <= 0) {
        alert('Failed to contact ISS server after several attempts')
        return
    }
fetch(url).then(res => res.json() )// Process response as JSON
.then(issData => {
    console.log(issData) 
    let lat = issData.latitude
    let long = issData.longitude
    issLat.innerHTML = lat
    issLong.innerHTML = long
    // Create marker if it doesn't exist
    // Move marker if it does exist
    if (!issMarker) {
        issMarker = L.marker([lat, long], {icon: icon}).addTo(map)
    } else {
        issMarker.setLatLng([lat, long])
    }

    let now = Date()
    timeIssLocationFetched.innerHTML = `This data was fetched at ${now}`

}).catch((err) => {
    attempts--
    console.log('ERROR!', err)
}).finally(() => {
    setTimeout(iss, update, attempts)
})
}