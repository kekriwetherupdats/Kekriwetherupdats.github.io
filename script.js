const API_KEY = "b8eb9786c9e4334de4a6809aeaa785da";

function setBackground(weather) {
  weather = weather.toLowerCase();
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

  const locationName =
    data.name ||
    data.sys?.country ||
    "आपका क्षेत्र (GPS)";

  document.getElementById("cityName").innerText = locationName;
  document.getElementById("temp").innerText =
    Math.round(data.main.temp) + "°C";
  document.getElementById("desc").innerText =
    data.weather[0].description;

  document.getElementById("icon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  setBackground(data.weather[0].description);
}

/* 🔍 City search (sirf shehron ke liye) */
function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${API_KEY}&units=metric&lang=hi`
  )
    .then(res => {
      if (!res.ok) throw new Error("not found");
      return res.json();
    })
    .then(showWeather)
    .catch(() => {
      document.getElementById("error").innerText =
        "❌ गाँव/कस्बे के लिए GPS button use करें";
    });
}

/* 📍 GPS – गाँव, खेत, कस्बा सब */
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

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=hi`
      )
        .then(res => res.json())
        .then(showWeather);
    },
    () => {
      document.getElementById("error").innerText =
        "❌ Location allow nahi ki";
    }
  );
}

/* 🔥 App open hote hi GPS se weather */
window.onload = () => {
  getWeatherByLocation();
};
