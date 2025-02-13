const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const toggleBtn = document.getElementById('toggleBtn'); 

let tempCelsius = null; 
let isCelsius = true; 

async function checkWeather(city) {
    const api_key = "910afcd2fdefb492b5e5cc49574b9a1e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    const weather_data = await fetch(url).then(response => response.json());

    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    tempCelsius = Math.round(weather_data.main.temp); 
    updateTemperatureDisplay(); 

    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "cloud.png";
            break;
        case 'Clear':
            weather_img.src = "clear.png";
            break;
        case 'Rain':
            weather_img.src = "rain.png";
            break;
        case 'Mist':
            weather_img.src = "mist.png";
            break;
        case 'Snow':
            weather_img.src = "snow.png";
            break;
    }

    console.log(weather_data);
}


function updateTemperatureDisplay() {
    if (tempCelsius !== null) {
        if (isCelsius) {
            temperature.innerHTML = `${tempCelsius}°C`;
        } else {
            let tempFahrenheit = Math.round((tempCelsius * 9/5) + 32);
            temperature.innerHTML = `${tempFahrenheit}°F`;
        }
    }
}


searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});


toggleBtn.addEventListener('click', () => {
    isCelsius = !isCelsius; 
    updateTemperatureDisplay(); 
});
