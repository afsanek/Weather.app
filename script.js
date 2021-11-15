let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wendsday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dateTime = document.querySelector("#date-time");
let currentTime = new Date();
let searchForm = document.querySelector(".search-form");
let searchedCity = "New York";
//units
let units = "metric";
let cel = document.querySelector("#cel");
let farh = document.querySelector("#farh");

//info
let degree = document.querySelector("#current-temp");
let cityName = document.querySelector("#city-name");
let description = document.querySelector("#description");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let currentLocation = document.querySelector("#current-location");
let icon = document.querySelector("#icon");

//api
let apiKey = "20d87b3c54629cecfb5e61654cd02764";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=${units}&appid=${apiKey}`;

function updateInfo(response) {
  let temp = Math.round(response.data.main.temp);
  console.log(response);
  degree.innerHTML = temp;
  cityName.innerHTML = searchedCity;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}
axios.get(url).then(updateInfo);

//date
dateTime.innerHTML = `${
  days[currentTime.getDay()]
}, ${currentTime.getHours()}:${currentTime.getMinutes()}`;

//search
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  searchedCity = document.querySelector("#search-val").value;
  url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(updateInfo);
});

//units:
cel.addEventListener("click", function (event) {
  event.preventDefault();
  if (units !== "metric") {
    units = "metric";
    url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=${units}&appid=${apiKey}`;
    axios.get(url).then(function (response) {
      degree.innerHTML = Math.round(response.data.main.temp);
    });
  }
});
farh.addEventListener("click", function (event) {
  event.preventDefault();
  if (units === "metric") {
    units = "imperial";
    url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=${units}&appid=${apiKey}`;
    axios.get(url).then(function (response) {
      degree.innerHTML = Math.round(response.data.main.temp);
    });
  }
});

function updateInfoLocation(response) {
  let temp = Math.round(response.data.main.temp);
  degree.innerHTML = temp;
  searchedCity = response.data.name;
  cityName.innerHTML = searchedCity;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
}
function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(updateInfoLocation);
}
currentLocation.addEventListener("click", function (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
});
