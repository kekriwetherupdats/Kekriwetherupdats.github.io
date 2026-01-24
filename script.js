const API_KEY = "b8eb9786c9e4334de4a6809aeaa785da";

function showWeather(data, placeName) {
  document.getElementById("error").innerText = "";

  document.getElementById("cityName").innerText =
    placeName || "आपका क्षेत्र";

  document.getElementById("temp").innerText =
    Math.round(data.main.temp) + "°C";

  document.getElementById("desc").innerText =
    data.weather[0].description;

  document.getElementById("icon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

/* 📍 GPS Weather + City/Village Name */
function getWeatherByLocation() {
  if (!navigator.geolocation) {
    document.getElementById("error").innerText =
      "GPS supported nahi hai";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      /* 1️⃣ Weather API */
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=hi`
      )
        .then(res => res.json())
        .then(weatherData => {

          /* 2️⃣ Reverse Geo API (City/Village name) */
          fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
          )
            .then(res => res.json())
            .then(geoData => {
              let place = "आपका क्षेत्र";

              if (geoData.length > 0) {
                place =
                  geoData[0].name +
                  (geoData[0].district ? ", " + geoData[0].district : "") +
                  (geoData[0].state ? ", " + geoData[0].state : "");
              }

              showWeather(weatherData, place);
            });
        });
    },
    () => {
      document.getElementById("error").innerText =
        "❌ Location allow nahi ki";
    }
  );
}

/* 🔍 City search (optional) */
function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${API_KEY}&units=metric&lang=hi`
  )
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(data => showWeather(data, city))
    .catch(() => {
      document.getElementById("error").innerText =
        "City nahi mili, GPS use karo";
    });
}

/* 🔥 Auto load GPS weather */
window.onload = () => {
  getWeatherByLocation();
};
