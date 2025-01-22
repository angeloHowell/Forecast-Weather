let form = document.getElementById("form-container");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let city = document.getElementById("city").value;
  console.log(city);

  getWeatherData(city).then((response) => {
    const { main, clouds, wind } = response;

    const cityError = document.querySelector("#city-error");
    const section = document.getElementById("temp-section");
    if (!main || !clouds || !wind) {
      cityError.style.display = "flex";
      section.style.display = "none";
      return;
    }

    cityError.style.display = "none";
    section.style.display = "flex";

    const kelvin_to_celsius_temp = 273.15;

    const minTemp = document.getElementById("min-temp");
    minTemp.textContent = Math.round(main.temp_min - kelvin_to_celsius_temp);
    const currentTemp = document.getElementById("current-temp");
    currentTemp.textContent = Math.round(main.temp - kelvin_to_celsius_temp);
    const maxTemp = document.getElementById("max-temp");
    maxTemp.textContent = Math.round(main.temp_max - kelvin_to_celsius_temp);

    const humidity = document.getElementById("humidity");
    humidity.textContent = main.humidity;
    const pressure = document.getElementById("pressure");
    pressure.textContent = main.pressure;

    const frontClouds = document.getElementById("clouds");
    frontClouds.textContent = clouds.all;
    const frontWind = document.getElementById("wind");
    frontWind.textContent = wind.speed;
  });

  console.log("hola");
});

function getWeatherData(city) {
  try {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fb8fc2f13e868198daa2a9460b4af9e3`
    )
      .then((response) => response.json())
      .catch((error) => console.error(error));
  } catch (error) {
    console.error("Promise resolved but HTTP status failed");
  }
}
