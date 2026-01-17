const API_KEY = "b8eb9786c9e4334de4a6809aeaa785da";

function setBackground(weather) {
  if (weather.includes("cloud")) {
    document.body.style.background = "linear-gradient(#bdc3c7,#2c3e50)";
  } else if (weather.includes("rain")) {
    document.body.style.background = "linear-gradient(#4b79a1,#283e51)";
  } else if (weather.includes("clear")) {
    document.body.style.background = "linear-gradient(#f7971e,#ffd200)";
  } else {
    document.body.style.background = "linear-gradient(#74ebd5,#ACB6E5)";
  }
}

function showWeather(data) {
  document.getElementById("weatherBox").classList.remove("hidden");
  document.getElementById("error").innerText = "";

  document.getElementById("cityName").innerText = data.name;
  document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
  document.getElementById("desc").innerText = data.weather[0].description;
  document.getElementById("icon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  setBackground(data.weather[0].description);
}

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(res => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then(showWeather)
    .catch(() => {
      document.getElementById("error").innerText = "City not found ❌";
    });
}

function getWeatherByLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(showWeather);
  });
}
