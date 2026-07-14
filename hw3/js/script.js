const API_KEY = "fe35034c1e10d84ff51e380e97dbc56e";
const EMPTY_SEARCH_ERROR = "hi please enter a city";
const CITY_404_ERROR = "this city doesn't exist :( check your spelling?";

// search bar...
document.querySelector('#search-bar').addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        console.log("weather search initiated");
        getWeather();
    }
});
document.querySelector('#search-icon').addEventListener("click", getWeather);


async function getWeather() {
    clearError(); // prevenet leftover errors
    if (isSearchEmpty()) {
        // hi please enter a city
        console.log("validation issue: the search is empty :(");
        displayError(EMPTY_SEARCH_ERROR);
        return;
    }
    else {
        // calling api
        let city = document.querySelector('#search-bar').value;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        let response = await fetch(url);
        let data = await response.json();

        if (data.message == 'city not found') {
            displayError(CITY_404_ERROR);
        } else {
            displayWeather(data);
        }
    }
}

function displayWeather(data) {
    console.log("search successful, displayWeather()..");
    document.getElementById('temperature') = `${K_to_F_rounded(data.main.temp)}°F`;
    document.getElementById('temp-min').textContent = `${K_to_F_rounded(data.main.temp_min)}°F`;
    document.getElementById('temp-max').textContent = `${K_to_F_rounded(data.main.temp_max)}°F`;
    document.getElementById('w-main').textContent = data.weather[0].main.toLowerCase();
    document.getElementById('w-desc') = data.weather[0].description;
    document.getElementById('advice') = getAdvice(data.weather[0].id);
}

// returns advice :3
function getAdvice(weather_id) {

}

//todo change background

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

function K_to_F_rounded (K) {
    return Math.round(((K - 273.15) * (9/5)) + 32);
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