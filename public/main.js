const weatherDisplay = document.querySelector(".weather");
const weatherForm = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");

const PORT = 3000; // Typically your backend port
const HOST = "localhost"; // Typically localhost during development

// Fetch weather data from API
const fetchWeather = async (city) => {
  const url = `http://${HOST}:${PORT}/api?q=${city}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === "404") {
    alert("City not found");
    return;
  }

  const displayData = {
    city: data.name,
    temp: kelvinToCelsius(data.main.temp),
  };

  addWeatherToDOM(displayData);
};

// Add display data to DOM
const addWeatherToDOM = (data) => {
  weatherDisplay.innerHTML = `
    <h1>Weather in ${data.city}</h1>
    <h2>${data.temp} &deg;C</h2>
  `;
  cityInput.value = "";
};

// Convert Kelvin to Celsius
function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(1);
}

// Event listener for form submission
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (cityInput.value === "") {
    alert("Please enter a city");
  } else {
    fetchWeather(cityInput.value);
  }
});

// Initial fetch
fetchWeather("London");
