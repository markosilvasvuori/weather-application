const apiKey = '1837d58ad4babc15031ecd3ca5048c5a';
const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const errorMsg = document.querySelector('.error-msg');
const unitsBtn = document.querySelector('.units-btn');
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
    document.querySelector('.container').classList.add('bg-box');
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

                displayData();
            })
            .catch((error) => {
                console.log('Something went wrong');
                errorMsg.style.display = 'block';
            });
}


function displayData() {

    if (unitsBtn.style.display = 'none') {
        unitsBtn.style.display = 'block';
    }

    if (errorMsg.style.display = 'block') {
        errorMsg.style.display = 'none';
    }

    cityName.innerText = cityInput.value;
    icon.src = weatherIcon;
    icon.style.display = 'block';
    

    if (units === 'metric') {
        temperature.innerText = `${weather} C`;
        feelsLike.innerText = `Feels like ${weatherFeelsLike} C`;
    } else  {
        temperature.innerText = `${weather} F`;
        feelsLike.innerText = `Feels like ${weatherFeelsLike} F`;
    }
}

unitsBtn.addEventListener('click', () => {
    if (units === 'metric') {
        units = 'imperial';
        fetchData();
    } else {
        units = 'metric';
        fetchData();
    }
});