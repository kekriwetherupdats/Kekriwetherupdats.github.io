// 🔑 REAL OpenWeather API KEY
const apiKey = "b8eb9786c9e4334de4a6809aeaa785da";

function getWeather() {
  const cityInput = document.getElementById("cityInput");
  const output = document.getElementById("output");

  // Default = Kekri, India
  let city = cityInput.value.trim();
  if (city === "") {
    city = "Kekri,IN";
  } else {
    city = city + ",IN";
  }

  output.innerHTML = "⏳ मौसम लोड हो रहा है...";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&lang=hi&appid=${apiKey}`
  )
    .then(res => res.json())
    .then(data => {
      // ❌ API Error
      if (data.cod !== 200) {
        output.innerHTML = `
          ❌ मौसम नहीं मिला<br>
          कारण: ${data.message}
        `;
        return;
      }

      // ✅ SUCCESS (REAL DATA)
      output.innerHTML = `
        🌍 शहर: <b>${data.name}</b><br>
        🌡 तापमान: <b>${Math.round(data.main.temp)} °C</b><br>
        ☁ मौसम: <b>${data.weather[0].description}</b><br>
        💧 नमी: <b>${data.main.humidity}%</b><br>
        🌬 हवा: <b>${data.wind.speed} m/s</b>
      `;
    })
    .catch(err => {
      output.innerHTML = `
        ❌ Network / API Error<br>
        ${err.message}
      `;
    });
}
