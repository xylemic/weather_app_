const apiKey = "20ff525fa948a4730dd33dce025cd9c8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const search_box = document.getElementById('city_input');
const search_btn = document.getElementById('search_button');
const weather_icon = document.querySelector('.weather_icon');

// an asynchronous function to get weather information from the weather api
async function getWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  const data = await response.json();
  console.log(data);

  // get the city name, temperature, humidity, and wind values from the html and match them with the weather data in the response
  document.getElementById('city_name').innerHTML = data.name;
  document.getElementById('temperature').innerHTML = `${data.main.temp.toFixed()}°c`;
  document.getElementById('humidity').innerHTML = `${data.main.humidity}%`;
  document.getElementById('wind').innerHTML = `${data.wind.speed} km/h`;
  // get the weather icon from the weather data and update the weather icon image
  if (data.weather[0].main === 'Rain') {
    weather_icon.src = './assets/images/rain.png';
    document.getElementById('weather_description').innerHTML = 'Rain';
  } else if (data.weather[0].main === 'Clouds') {
    weather_icon.src = './assets/images/clouds.png';
    document.getElementById('weather_description').innerHTML = 'Clouds';
  } else if (data.weather[0].main === 'Clear') {
    weather_icon.src = './assets/images/sunny.png';
    document.getElementById('weather_description').innerHTML = 'Clear Sky';
  } else if (data.weather[0].main === 'Drizzle') {
    weather_icon.src = './assets/images/drizzle.png';
    document.getElementById('weather_description').innerHTML = 'Drizzle';
  } else if (data.weather[0].main === 'Mist') {
    weather_icon.src = './assets/images/mist.png';
    document.getElementById('weather_description').innerHTML = 'Mist';
  }

  document.querySelector('.weather').style.display = 'block';
}

// listen for search button click event and call the getWeather function
search_btn.addEventListener('click', () => {
  getWeather(search_box.value);
  search_box.value = ''; // clear the input field after searching
})

// enter key press to search weather 
 search_box.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    getWeather(search_box.value);
    search_box.value = ''; // clear the input field after searching
  }
});

