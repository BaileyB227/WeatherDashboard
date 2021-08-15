let apiKey = "3d47311119b7b5ec8772c781e9cdddce";
let city = "";

$("#search-btn").on("click", function(event){
    event.preventDefault();
    city = $("#search-city").val().trim();
    getWeather();
})

function getWeather() {
    let latlonUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    
    fetch(latlonUrl)
    .then(headers => headers.json())
    .then(cityData => {
        let cityLat = cityData.city.coord.lat;
        let cityLon = cityData.city.coord.lon;
        let weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=${apiKey}`
        
        fetch(weatherUrl)
        .then(headers => headers.json())
        .then(weatherData =>{

            let currentIcon = weatherData.current.weather[0].icon
            let currentUvi = weatherData.current.uvi

            $("#currentCity").text(city)
            $("#currentDate").text(moment().format("(M/D/YYYY)"));
            $("#currentIcon").attr("src", "https://openweathermap.org/img/w/" + currentIcon + ".png");
            $("#currentTemp").text(weatherData.current.temp);
            $("#currentWind").text(weatherData.current.wind_speed);
            $("#currentHumidity").text(weatherData.current.humidity);
            $("#currentUV").text(currentUvi);

            if (currentUvi>=0 && currentUvi<3) {
                $("#currentUV").css('background-color', 'green')
            } else if (currentUvi>=3 && currentUvi<6){
                $("#currentUV").css('background-color', 'yellow')
            } else {
                $("currentUV").css('background-color', 'red')
            };

            $("#date1").text(moment(weatherData.daily.dt).format("M/D/YYYY"));
            $("weather1")
            $("temp1")
            $("wind1")
            $("humidity1")

            console.log(moment(weatherData.daily[1].dt).format("M/D/YYYY"))
            console.log(weatherData.daily[1].dt)
        })
    })
}