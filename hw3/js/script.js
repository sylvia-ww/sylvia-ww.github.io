const API_KEY = "fe35034c1e10d84ff51e380e97dbc56e";
const EMPTY_SEARCH_ERROR = "hi please enter a city";
const CITY_404_ERROR = "this city doesn't exist :( check your spelling?";
let temp_unit = 'F';
// in kelvin
let temp_min = '250';
let temp_max = '333';
let temp_now = '270';
updateTemps();

document.querySelector('#search-bar').addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        console.log("weather search initiated");
        getWeather();
    }
});
document.querySelector('#search-icon').addEventListener("click", getWeather);
document.querySelector('#toggle-btn').addEventListener("click", toggleUnits);



async function getWeather() {
    clearError(); // prevenet leftover errors
    document.getElementById('weathergirl').textContent = ''; // byebye
    if (isSearchEmpty()) {
        // hi please enter a city
        console.log("validation issue: the search is empty :(");
        displayError(EMPTY_SEARCH_ERROR);
        return;
    }
    else {
        // calling api
        let city = document.querySelector('#search-bar').value.toLowerCase();
        // easter egg :)
        if (city == 'weathergirl') {
            //window.open('https://www.youtube.com/watch?v=M7VSEZOQIlg', '_blank');
            let weathergirl = {
                weather: [
                    {
                        id: 'weathergirl',
                        main: "vivid skies",
                        description: "may pass me by",
                        icon: '10n',
                    }
                ],
            }
            document.getElementById('weathergirl').innerHTML =
                `<a href="https://www.youtube.com/watch?v=M7VSEZOQIlg" target="_blank" rel="noopener noreferrer">the weather forecast's calling for another cloudy day</a>`;
            displayWeather(weathergirl);
            temp_now = "-";
            temp_min = "-";
            temp_max = "-";
            updateTemps();
            return;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        let response = await fetch(url);
        let data = await response.json();

        if (data.message == 'city not found') {
            displayError(CITY_404_ERROR);
        } else {
            // update internal global vars
            temp_min = data.main.temp_min;
            temp_max = data.main.temp_max;
            temp_now = data.main.temp;
            displayWeather(data);
        }
    }
}

function toggleUnits() {
    // toggled
    // change the var
    if (temp_unit == 'F') {
        temp_unit = 'C'
    } else {
        temp_unit = 'F';
    }

    // update existing info
    updateTemps();
}

// update temps from internal vars(NO NEW INFO displayed)
function updateTemps() {
    document.getElementById('temperature').textContent = `${kelvin_conv(temp_now)}`;
    document.getElementById('degree').textContent = `°${temp_unit}`; // middle f/c
    document.getElementById('temp-min').textContent = `${kelvin_conv(temp_min)}°${temp_unit}`;
    document.getElementById('temp-max').textContent = `${kelvin_conv(temp_max)}°${temp_unit}`;
}

// for new api weather info after search
function displayWeather(data) {
    console.log("search successful, displayWeather()..");

    updateTemps();
    document.getElementById('w-main').textContent = data.weather[0].main.toLowerCase();
    document.getElementById('w-desc').textContent = data.weather[0].description;
    document.getElementById('advice').textContent = getAdvice(data.weather[0].id);
    document.querySelector('body').style.backgroundImage = `url(${getBgUrl(data.weather[0].id)})`;
    document.getElementById('weather-icon').src = `https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png`;
}

// converts kelvin (raw temp) to F or C (depending on temp_units)
function kelvin_conv(K) {
    if (K == '-') {
        return '-';
    }
    switch (temp_unit) {
        case 'F':
            return Math.round((K - 273.15) * (9 / 5) + 32);
            break;
        case 'C':
            return Math.round(K - 273.15);
            break;
        default:
            return '-';
    }
}
// -- end of temperature functions





// :3
function getAdvice(weather_id) {
    switch (true) {
        case (weather_id == 'weathergirl'):
            return "but even still i'll stay";
        case (weather_id == 800):
            return 'someday~';
        case (weather_id == 801):
            return 'nice~';
        case (weather_id == 802):
            return 'cloudy~';
        case (weather_id == 803):
            return 'nap time~';
        case (weather_id >= 700): // atmosphere
            return 'stay safe out there~';
        case (weather_id >= 600): //snow
            return 'bring snow boots~';
        case (weather_id >= 200): // 200 to 600 rain
            return 'bring an umbrella~';
            break;
        default:
            return `something went wrong~ weather code: ${weather_id}`;
    }
}

function getBgUrl(weather_id) {
    console.log(weather_id);
    let bg = {
        sunny: './img/bg-sunny.jpg',
        cloudy: './img/bg-cloudy.jpg',
        stormy: './img/bg-stormy.jpg',
    };
    switch (true) {
        case (weather_id == 'weathergirl'):
            return bg.cloudy;
        case (weather_id == 800):
            return bg.sunny;
        case (weather_id === 801 || weather_id == 802):
            //801 - few clouds
            //802 - scattered clouds
            return bg.sunny;
        case (weather_id == 803): //broken clouds
            return bg.cloudy;
        case (weather_id == 804): //overcast clouds
            return bg.stormy;
        case (weather_id >= 700): //atmosphere
            return bg.stormy;
        case (weather_id >= 300): //drizzle, rain, snow
            return bg.cloudy;
        case (weather_id >= 200): //thunderstorm
            return bg.stormy;
        default:
            return bg.cloudy;
    }
}









// validation
// returns a boolean
function isSearchEmpty() {
    return (document.querySelector('#search-bar').value == '');
}

function displayError(error_msg) {
    let error = document.querySelector('#search-error');
    error.textContent = error_msg;
    error.style.marginTop = "0.5rem";

}
function clearError() {
    let error = document.querySelector('#search-error');
    error.textContent = '';
    error.style.marginTop = "0";
}






// sample api call for future referecne
// {
//   "coord": {
//     "lon": -122.4194,
//     "lat": 37.7749
//   },
//   "weather": [
//     {
//       "id": 802,
//       "main": "Clouds",
//       "description": "scattered clouds",
//       "icon": "03d"
//     }
//   ],
//   "base": "stations",
//   "main": {
//     "temp": 292.27,
//     "feels_like": 291.93,
//     "temp_min": 289.95,
//     "temp_max": 296.18,
//     "pressure": 1013,
//     "humidity": 65,
//     "sea_level": 1013,
//     "grnd_level": 1010
//   },
//   "visibility": 10000,
//   "wind": {
//     "speed": 1.34,
//     "deg": 289,
//     "gust": 3.58
//   },
//   "clouds": {
//     "all": 43
//   },
//   "dt": 1783997874,
//   "sys": {
//     "type": 2,
//     "id": 2017837,
//     "country": "US",
//     "sunrise": 1783947496,
//     "sunset": 1783999932
//   },
//   "timezone": -25200,
//   "id": 5391959,
//   "name": "San Francisco",
//   "cod": 200
// }