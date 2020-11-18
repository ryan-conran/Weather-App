function buildTemp(tempInfo) {
    let repUVIndexEl = '<p>UV Index: ' + tempInfo.repUV + '</p>'
    let currentDateEl = '<h3>' + tempInfo.city + ' ' + tempInfo.focusDate.substr(0, 10) + '</h3>';
    let mainIconEl = '<img src =' + tempInfo.iconUrl + ' />';
    let repTempEl = '<p>Temp: ' + tempInfo.repTemp + '&#8457;</p>';
    let repHumEl = '<p>Humidity: ' + tempInfo.repHum + '%</p>';
    let repWindEl = '<p>Wind: ' + tempInfo.repWind + ' MPH</p>';
    $("#mainWeather").empty();
    $("#mainWeather").append(currentDateEl);
    $("#mainWeather").append(mainIconEl);
    $("#mainWeather").append(repTempEl);
    $("#mainWeather").append(repHumEl);
    $("#mainWeather").append(repWindEl);
    $("#mainWeather").append(repUVIndexEl);
  }

  function build5Day(response) {
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

const arr = JSON.parse(localStorage.getItem("history"));
$(".five-days").empty();

if (arr) {
    const cityData = JSON.parse(localStorage.getItem(arr[0]));
    
    build5Day(cityData);
    buildTemp(cityData.tempInfo);

    for (i = 0; i < arr.length; i++) {
        let ulItem = $("<li onclick='onCitySelect(this)'>").addClass("list-group-item list-Btn").text(arr[i]);
        $(".city-list").append(ulItem);

    }
}
 
function onCitySelect(element) {
    const city = element.innerText;
    $(".five-days").empty();
    const cityTemp = JSON.parse(localStorage.getItem(city));
    build5Day(cityTemp);
    buildTemp(cityTemp.tempInfo);
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
        let repTemp = (response.main.temp - 273.15) * 1.80 + 32;
        repTemp = repTemp.toFixed();
        let mainIcon = response.weather[0].icon
        let iconUrl = "https://openweathermap.org/img/wn/" + mainIcon + "@2x.png"
        let repHum = response.main.humidity;
        let repWind = response.wind.speed;
        let uvLong = response.coord.lon;
        let uvLat = response.coord.lat;
        let uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + uvLat + "&lon=" + uvLong + "&appid=" + apiKey

        $.ajax({
            url: uvIndexURL,
            method: "GET"
        }).then(function (response) {
            let repUV = response.value;
            let focusDate = response.date_iso;




            const tempInfo = {
                iconUrl: iconUrl,
                repUV: repUV,
                city: city,
                focusDate: focusDate,
                repTemp: repTemp,
                repHum: repHum,
                repWind: repWind
            };

            buildTemp(tempInfo);

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

                response.tempInfo = tempInfo;
                // what city is this refrencing? line 104 or line 96?
                localStorage.setItem(city, JSON.stringify(response));
            });
        });

    });


});
