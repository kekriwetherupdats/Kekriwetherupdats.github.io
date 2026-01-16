// 🔑 OpenWeather API Key
const apiKey = "b8eb9786c9e4334de4a6809aeaa785da";

function getWeather(){
  const cityInput = document.getElementById("cityInput");
  const output = document.getElementById("output");

  // Default city = Kekri, India
  let city = cityInput.value.trim();
  if(city === ""){
    city = "Kekri,IN";
  }else{
    city = city + ",IN";
  }

  // Loading message
  output.innerHTML = "⏳ मौसम लोड हो रहा है...";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=hi&appid=${apiKey}`
  )
  .then(response => response.json())
  .then(data => {

    // Error handling
    if(data.cod !== 200){
      output.innerHTML = "❌ मौसम की जानकारी नहीं मिली";
      return;
    }

    // Success output
    output.innerHTML = `
      🌍 शहर: <b>${data.name}</b><br>
      🌡 तापमान: <b>${Math.round(data.main.temp)} °C</b><br>
      ☁ मौसम: <b>${data.weather[0].description}</b><br>
      💧 नमी: <b>${data.main.humidity}%</b><br>
      🌬 हवा: <b>${data.wind.speed} m/s</b>
    `;
  })
  .catch(() => {
    output.innerHTML = "❌ Network / API समस्या";
  });
}
