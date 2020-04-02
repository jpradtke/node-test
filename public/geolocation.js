//import { response } from "express";

// Get Geolocation from user agent
if ("geolocation" in navigator) {
    console.log('geolocation is available');
    navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        document.getElementById("latitude").textContent = lat;
        const lon = position.coords.longitude;
        document.getElementById("longitude").textContent = lon;
        console.log(position);

        //send the data to the server
        const data = { lon, lat };
        const options = {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/api', options);
        const json = await response.json();
        console.log(json);

    });
} else {
    console.log('geolocation IS NOT available');
}

//