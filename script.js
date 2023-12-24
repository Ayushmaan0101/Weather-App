const inputbox = document.getElementById('inputbox');
const searchbtn = document.getElementById('searchbtn');
const weatherimg = document.getElementById('weatherimg');
const Temperature = document.getElementById('Temperature');
const weathercondition = document.getElementById('whethercondition');
const humiditytemp = document.getElementById('humiditytemp');
const windspeed = document.getElementById('windspeed');
const locationerror = document.getElementById('locationerror');
const humidityandwind = document.getElementById('humidityandwind');




searchbtn.addEventListener('click', function () {
    checkWeather(inputbox.value);
});

async function checkWeather(city) {
    const apiKey = "e181f1299160afaed0f3e7d3204435b6";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const weatherData = await response.json();

        if (weatherData.cod === '404') {
            locationerror.style.display = 'flex';
            weatherimg.src = "";
            humidityandwind.style.display = 'none';
            Temperature.innerHTML = "";
            weathercondition.innerHTML = " ";
            console.log("Location not found!");
            return;
        } else {
            locationerror.style.display = 'none';
            humidityandwind.style.display = 'flex';
        }

        Temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
        weathercondition.innerHTML = `${weatherData.weather[0].description}`;
        humiditytemp.innerHTML = `${weatherData.main.humidity}%`;
        windspeed.innerHTML = `${weatherData.wind.speed} Km/h`;
        

        switch (weatherData.weather[0].main) {
            case 'Clouds':
                weatherimg.src = "cloudyweather.svg";
                break;
            case 'Rain':
                weatherimg.src = "rainyweather.png";
                break;
            case 'Smoke':
                weatherimg.src = "foggyweather.svg";
                break;
            case 'Snow':
                weatherimg.src = "snowweather.png";
                break;
            case 'Clear':
                weatherimg.src = "sunnyweather.png";
                weatherimg.style.marginTop = "20px"
                break;
            default: weatherimg.src = "cloudyweather.svg";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}



