const cityForm = document.querySelector("form");
const weatherInformation = document.querySelector(".weather-information");
const h2 = document.querySelector("h2");
const className = "vanish";
const forecast = new Forecast();

const updateUI = (data) => {
  const { city, weather } = data;

  updateWeatherInformation(city, weather);
  updateImage(weather);
  updateIcon(weather);
  display(weatherInformation.parentElement.classList);
  vanish(h2.classList);
};

const updateWeatherInformation = (city, weather) => {
  weatherInformation.firstElementChild.textContent = city.EnglishName;
  weatherInformation.firstElementChild.nextElementSibling.textContent =
    weather.WeatherText;
  weatherInformation.lastElementChild.firstElementChild.textContent =
    weather.Temperature.Metric.Value;
};

const updateImage = (weather) => {
  const img = document.querySelector(".time");
  let imgSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  img.src = imgSrc;
};

const updateIcon = (weather) => {
  const icon = document.querySelector(".icon");
  icon.src = `img/icons/${weather.WeatherIcon}.svg`;
};

const display = (classList) => {
  if (classList.contains(className)) {
    classList.remove(className);
  }
};

const vanish = (classList) => {
  if (!classList.contains(className)) {
    classList.add(className);
  }
};

const handleError = (error) => {
  console.log(error.message);
  h2.innerHTML = `
    <span class="material-symbols-outlined">
      cancel
    </span>
    ${error.message}!
  `;
  display(h2.classList);
  vanish(weatherInformation.parentElement.classList);
};

cityForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const cityName = cityForm.city.value.trim();
  cityForm.reset();

  forecast
    .updateCity(cityName)
    .then((data) => updateUI(data))
    .catch((error) => handleError(error));
});
