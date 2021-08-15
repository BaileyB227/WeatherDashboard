let apiKey = "3d47311119b7b5ec8772c781e9cdddce";
let city = "";

$("#search-btn").on("click", function(event){
    event.preventDefault();
    city = $("#search-city").val();
    getWeather();
    cityHistory();
    storeLocal();
})

function getWeather() {
    let latlonUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    
    fetch(latlonUrl)
    .then(headers => headers.json())
    .then(cityData => {
        let cityLat = cityData.city.coord.lat;
        let cityLon = cityData.city.coord.lon;
        let weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}`
        
        fetch(weatherUrl)
        .then(headers => headers.json())
        .then(weatherData =>{
            console.log(weatherData)
        })
    })
}