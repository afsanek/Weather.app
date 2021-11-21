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
let searchedCity;
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

//--------apikey
let apiKey = "20d87b3c54629cecfb5e61654cd02764";

function search(city) {
  searchedCity = city;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(url).then(updateInfo);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=${forecastDay.weather[0].description}
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(forecastUrl).then(displayForecast);
}

function updateInfo(response) {
  let temp = Math.round(response.data.main.temp);
  degree.innerHTML = temp;
  cityName.innerHTML = searchedCity;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: <span class="red">${response.data.main.humidity}%</span>`;
  wind.innerHTML = `Wind: <span class="red">${response.data.wind.speed} km/h</span>`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function setDate() {
  dateTime.innerHTML = `${
    days[currentTime.getDay()]
  }, ${currentTime.getHours()}:${currentTime.getMinutes()}`;
}

//search
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  searchedCity = document.querySelector("#search-val").value;
  url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(updateInfo);
});

//////---------------current location----------------
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

function setPic() {
  let path = "image/1.jpg";
  let randomNum = Math.floor(Math.random() * pics.length);
  document.getElementById("poster").src = pics[randomNum];
}
search("New York");
setDate();

var pics = new Array(
  "image/1.jpg",
  "image/2.jpg",
  "image/3.jpg",
  "image/4.jpg"
);
setPic();
