function refreshWeather(response) {
  let temperatureElement = document.querySelector("#weather-app-temperature");

  let temperature = response.data.main.temp; // Correct property access
  let cityElement = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#description"); // Corrected id attribute
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.dt * 1000); // Correct property access
  let icon = document.querySelector("#icon");

  icon.innerHTML = ` <img src="${response.data.condition.icon_url}"   class="weather-app-icon"/>`;

  cityElement.innerHTML = response.data.name; // Correct property access
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.weather[0].description; // Correct property access
  humidityElement.innerHTML = `${response.data.main.humidity} %`; // Correct property access
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`; // Correct property access

  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${days[day]} ${hours}:${minutes}`; // Use days array to get the day name
}

function searchCity(city) {
  let apiKey = "your_api_key_here"; // Replace with your actual API key
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(refreshWeather);
}

function searchButton(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchButton);

searchCity("Paris");
