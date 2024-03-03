const coordinates = [
  { latitude: 39.7456, longitude: -97.0892 }, // America/Chicago - Linn - TOP
  { latitude: 40.7128, longitude: -74.006 }, // America/New_York - Hoboken - OKX
  { latitude: 34.0522, longitude: -118.2437 }, //America/Los_Angeles - Vernon - LOX
  { latitude: 29.7604, longitude: -95.3698 }, // America/Chicago - Houston - HGX
  { latitude: 33.4484, longitude: -112.074 }, // America/Phoenix - Guadalupe - PSR
  { latitude: 39.9526, longitude: -75.1652 }, // America/New_York - Camden - PHI
  { latitude: 29.4241, longitude: -98.4936 }, // America/Chicago - Olmos Park - EWX
  { latitude: 32.7157, longitude: -117.1611 }, // America/Los_Angeles - Coronado - SGX
  { latitude: 32.7767, longitude: -96.797 }, // America/Chicago - Dallas - FWD
  { latitude: 37.3382, longitude: -121.8863 }, // America/Los_Angeles - Burbank - MTR
  { latitude: 39.0473, longitude: -95.6752 }, // America/Chicago - Topeka - TOP
];

const div = document.getElementById("div");
const buttonLeft = document.getElementById("buttonLeft");

let index = 0;

function fetchData() {
  fetch(
    `https://api.weather.gov/points/${coordinates[index].latitude},${coordinates[index].longitude}`
  )
    .then((data) => data.json())
    .then((result) => {
      const timeZone = document.getElementById("timeZone");
      const city = document.getElementById("city");

      timeZone.innerHTML = result.properties.timeZone;
      city.innerHTML = result.properties.relativeLocation.properties.city;

      console.log(result.properties.gridId);
      console.log(result);
      return fetch(
        `https://api.weather.gov/gridpoints/${result.properties.gridId}/${result.properties.gridX},${result.properties.gridY}/forecast/hourly`
      );
    })
    .then((data) => data.json())
    .then((result) => {
      console.log(result);
      const temperature = document.getElementById("temperature");
      const temperatureUnit = document.getElementById("temperatureUnit");

      temperature.innerHTML = result.properties.periods[index].temperature;
      temperatureUnit.innerHTML =
        result.properties.periods[index].temperatureUnit;
    });
}

buttonLeft.addEventListener("click", () => {
  console.log("button right clicked");
  index--;

  if (index <= 0) {
    index = coordinates.length - 1;
  }
  fetchData();
});

buttonRight.addEventListener("click", () => {
  console.log("button right clicked");
  index++;

  if (index >= coordinates.length) {
    index = 0;
  }
  fetchData();
});

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});
