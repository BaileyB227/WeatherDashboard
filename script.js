let apiKey = "3d47311119b7b5ec8772c781e9cdddce";
let queryUrl = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=${apiKey}`
fetch(queryUrl)
.then(headers => headers.json())
.then(weatherData => {
    console.log(weatherData);
})