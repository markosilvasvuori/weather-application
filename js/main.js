const apiKey = '1837d58ad4babc15031ecd3ca5048c5a';
const cityInput = document.querySelector('.cityInput');
const searchBtn = document.querySelector('.searchBtn');
let cityName = document.querySelector('.city-name');
let icon = document.querySelector('.weather-icon');
let temperature = document.querySelector('.temperature');
let conditions = document.querySelector('.conditions');
let feelsLike = document.querySelector('.feels-like')
let units = 'metric';
let city = '';
let weather;
let weatherFeelsLike;
let weatherIcon;
let weatherIconId;

searchBtn.addEventListener('click', () => {
    fetchData();
});

function fetchData() {
    city = cityInput.value;
    let apiCall = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

    fetch(apiCall)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            return response.json();
        })
            .then((data) => {
                console.log(data);
                weather = data.main.temp;
                weatherFeelsLike = data.main.feels_like;
                conditions.innerText = data.weather[0].main;
                weatherIconId = data.weather[0].icon;
                weatherIcon = `http://openweathermap.org/img/wn/${weatherIconId}@2x.png`;
                console.log(weather + 'C')
                console.log('Feels like ' + weatherFeelsLike +'C')
                console.log(weatherIconId)
                console.log(weatherIcon)

                displayData();
            })
            .catch((error) => {
                console.log('Something went wrong');
            });
}

// Display data
function displayData() {
    cityName.innerText = cityInput.value;
    icon.src = weatherIcon;
    

    if (units === 'metric') {
        temperature.innerText = `${weather} C`;
        feelsLike.innerText = `Feels like ${weatherFeelsLike} C`;
    } else  {
        temperature.innerText = `${weather} F`;
        feelsLike.innerText = `Feels like ${weatherFeelsLike} F`;
    }
}