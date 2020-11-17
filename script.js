

  function build5Day(response) {
    console.log(response);
    let fiveDayArray = response.list;
    let day1 = fiveDayArray[6];
    let day2 = fiveDayArray[14];
    let day3 = fiveDayArray[22];
    let day4 = fiveDayArray[30];
    let day5 = fiveDayArray[38];



    $('.five-days').append(`
<div class="card col-sm-2" style="width: 18rem;">
<h5 class="card-title">${day1.dt_txt.split(' ')[0]}</h5>
<p class="card-text"><img src = "http://openweathermap.org/img/wn/${day1.weather[0].icon}@2x.png" /></p>
<p class="card-text">temp: ${((day1.main.temp - 273.15) * 1.80 + 32).toFixed(2)}&#8457</p>
<p class="card-text">humidity: ${day1.main.humidity}%
</div>
`)
    $('.five-days').append(`
<div class="card col-sm-2" style="width: 18rem;">
<h5 class="card-title">${day2.dt_txt.split(' ')[0]}</h5>
<p class="card-text"><img src = "http://openweathermap.org/img/wn/${day2.weather[0].icon}@2x.png" /></p>
<p class="card-text">temp: ${((day2.main.temp - 273.15) * 1.80 + 32).toFixed(2)}&#8457</p>
<p class="card-text">humidity: ${day2.main.humidity}%
</div>
`)
    $('.five-days').append(`
<div class="card col-sm-2" style="width: 18rem;">
<h5 class="card-title">${day3.dt_txt.split(' ')[0]}</h5>
<p class="card-text"><img src = "http://openweathermap.org/img/wn/${day3.weather[0].icon}@2x.png" /></p>
<p class="card-text">temp: ${((day3.main.temp - 273.15) * 1.80 + 32).toFixed(2)}&#8457</p>
<p class="card-text">humidity: ${day3.main.humidity}%
</div>
`)
    $('.five-days').append(`
<div class="card col-sm-2" style="width: 18rem;">
<h5 class="card-title">${day4.dt_txt.split(' ')[0]}</h5>
<p class="card-text"><img src = "http://openweathermap.org/img/wn/${day4.weather[0].icon}@2x.png" /></p>
<p class="card-text">temp: ${((day4.main.temp - 273.15) * 1.80 + 32).toFixed(2)}&#8457</p>
<p class="card-text">humidity: ${day4.main.humidity}%
</div>
`)
    $('.five-days').append(`
    <div class="card col-sm-2" style="width: 18rem;">
    <h5 class="card-title">${day5.dt_txt.split(' ')[0]}</h5>
    <p class="card-text"><img src = "http://openweathermap.org/img/wn/${day5.weather[0].icon}@2x.png" /></p>
    <p class="card-text">temp: ${((day5.main.temp - 273.15) * 1.80 + 32).toFixed(2)}&#8457</p>
    <p class="card-text">humidity: ${day5.main.humidity}%
    </div>
`);

}

let apiKey = "51f413c7f43e62a941348d7c35e44a31";
let cityArray = [];
$(document).on("click", ".list-Btn", function (event) {

});
const arr = JSON.parse(localStorage.getItem("history"));
if (arr) {
    const cityData = JSON.parse(localStorage.getItem(arr[0]));
    build5Day(cityData);

    for (i = 0; i < arr.length; i++) {
        let ulItem = $("<li onclick='onCitySelect(this)'>").addClass("list-group-item list-Btn").text(arr[i]);
        $(".city-list").append(ulItem);

    }
}

function onCitySelect(element) {
    const city = element.innerText;
    $(".five-days").empty();
    build5Day(JSON.parse(localStorage.getItem(city)));
}


$("#cityButton").click(function (event) {
    event.preventDefault();
    let city = $("#citysearch").val();
    localStorage.setItem("name", city);
    let weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    let ulItem = $("<li onclick='onCitySelect(this)'>").addClass("list-group-item list-Btn").text(city);
    $(".list-group").append(ulItem);

    $("#mainWeather").empty();
    $(".five-days").empty();

    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        let repTemp = (response.main.temp - 273.15) * 1.80 + 32;
        repTemp = repTemp.toFixed();
        let mainIcon = response.weather[0].icon
        let iconUrl = "http://openweathermap.org/img/wn/" + mainIcon + "@2x.png"
        let repHum = response.main.humidity;
        let repWind = response.wind.speed;
        let uvLong = response.coord.lon;
        let uvLat = response.coord.lat;
        let uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + uvLat + "&lon=" + uvLong + "&appid=" + apiKey
        $.ajax({
            url: uvIndexURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            let repUV = response.value;
            let focusDate = response.date;
            let mainDate = new Date(focusDate);
            console.log(mainDate)
            console.log(focusDate);
            let repUVIndexEl = '<p>UV Index: ' + repUV + '</p>'

            let currentDateEl = '<h3>' + city + ' ' + focusDate + '</h3>'

            $("#mainWeather").append(currentDateEl);
            $("#mainWeather").append(mainIconEl);
            $("#mainWeather").append(repTempEl);
            $("#mainWeather").append(repHumEl);
            $("#mainWeather").append(repWindEl);
            $("#mainWeather").append(repUVIndexEl);

            let fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
            $.ajax({
                url: fiveDayURL,
                method: "GET"
            }).then(function (response) {
                build5Day(response);
                const arr = JSON.parse(localStorage.getItem("history"));
                if (!arr) {
                    localStorage.setItem("history", JSON.stringify([city]));
                } else {
                    arr.push(city);
                    localStorage.setItem("history", JSON.stringify(arr));
                }

                localStorage.setItem(city, JSON.stringify(response));
            });
        });

        let mainIconEl = '<img src =' + iconUrl + ' />';
        let repTempEl = '<p>Temp: ' + repTemp + '&#8457;</p>';
        let repHumEl = '<p>Humidity: ' + repHum + '%</p>';
        let repWindEl = '<p>Wind: ' + repWind + ' MPH</p>';

    });
    // let mainFocusEl = '<h3>'+city+' '+focusDate+'<img src =http://openweathermap.org/img/wn/'+10d+'@2x.png '
    // let currentDateEl = '<h3>'+







});




      // function buildQueryURL() {
      //     let apiKey = "51f413c7f43e62a941348d7c35e44a31"

      //     $.getJSON(weatherURL + apiKey);

      // API call: api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}