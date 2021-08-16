let apiKey = "3d47311119b7b5ec8772c781e9cdddce";
let city = "";
let citySearches = JSON.parse(localStorage.getItem("search")) || [];

$("#search-btn").on("click", function(event){
    event.preventDefault();
    city = $("#search-city").val().trim();
    getWeather();
    cityList();
    saveSearch();
})

$('#city-list').on("click", (event) => {
    event.preventDefault();
    $('#search-city').val(event.target.textContent);
    city = $('#search-city').val();
    getWeather();
});

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
            let weatherIcon1 = weatherData.daily[1].weather[0].icon
            let weatherIcon2 = weatherData.daily[2].weather[0].icon
            let weatherIcon3 = weatherData.daily[3].weather[0].icon
            let weatherIcon4 = weatherData.daily[4].weather[0].icon
            let weatherIcon5 = weatherData.daily[5].weather[0].icon
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

            $("#date1").text(moment.unix(weatherData.daily[1].dt).format("M/D/YYYY"));
            $("#weather1").attr("src", "https://openweathermap.org/img/w/" + weatherIcon1 + ".png")
            $("#temp1").text(weatherData.daily[1].temp.day)
            $("#wind1").text(weatherData.daily[1].wind_speed)
            $("#humidity1").text(weatherData.daily[1].humidity)

            $("#date2").text(moment.unix(weatherData.daily[2].dt).format("M/D/YYYY"));
            $("#weather2").attr("src", "https://openweathermap.org/img/w/" + weatherIcon2 + ".png")
            $("#temp2").text(weatherData.daily[2].temp.day)
            $("#wind2").text(weatherData.daily[2].wind_speed)
            $("#humidity2").text(weatherData.daily[2].humidity)

            $("#date3").text(moment.unix(weatherData.daily[3].dt).format("M/D/YYYY"));
            $("#weather3").attr("src", "https://openweathermap.org/img/w/" + weatherIcon3 + ".png")
            $("#temp3").text(weatherData.daily[3].temp.day)
            $("#wind3").text(weatherData.daily[3].wind_speed)
            $("#humidity3").text(weatherData.daily[3].humidity)

            $("#date4").text(moment.unix(weatherData.daily[4].dt).format("M/D/YYYY"));
            $("#weather4").attr("src", "https://openweathermap.org/img/w/" + weatherIcon4 + ".png")
            $("#temp4").text(weatherData.daily[4].temp.day)
            $("#wind4").text(weatherData.daily[4].wind_speed)
            $("#humidity4").text(weatherData.daily[4].humidity)

            $("#date5").text(moment.unix(weatherData.daily[5].dt).format("M/D/YYYY"));
            $("#weather5").attr("src", "https://openweathermap.org/img/w/" + weatherIcon5 + ".png")
            $("#temp5").text(weatherData.daily[5].temp.day)
            $("#wind5").text(weatherData.daily[5].wind_speed)
            $("#humidity5").text(weatherData.daily[5].humidity)
        })
    })
}


function cityList() {
    let cityHistory = `<button type="button" class="list-group-item list-group-item-action active">${city}</button></li>`
    
    if (city !== ""){
        $("#city-list").append(cityHistory)
    }
}

function saveSearch() {
    searchedCity = $('#search-city').val().trim();
    
    citySearches.push(searchedCity);
    
    localStorage.setItem('history', JSON.stringify(citySearches));
}

function displayHistory(){
    for (i=0; i>citySearches.length; i++){
    let historyBtn = `<button type="button" class="list-group-item list-group-item-action active">${citySearches}</button></li>`
    $("#city-list").append(historyBtn)
    console.log()
    }
}

displayHistory();