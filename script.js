$(document).ready(function(){

let apiKey = "51f413c7f43e62a941348d7c35e44a31";
let cityArray = [];


$("#cityButton").click(function(event) {
  event.preventDefault();
  let city = $("#citysearch").val();
  localStorage.setItem("name", city);
  let weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=" + apiKey;
  let ulItem = $("<li>").addClass("list-group-item").text(city);
  $(".list-group").append(ulItem);

  $("#mainWeather").empty();

$.ajax({
    url: weatherURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    let repTemp = (response.main.temp - 273.15) * 1.80 + 32;
    repTemp = repTemp.toFixed();
    let repHum = response.main.humidity;
    let repWind = response.wind.speed;
    let uvLong = response.coord.lon;
    let uvLat = response.coord.lat;
    let uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat="+uvLat+"&lon="+uvLong+"&appid=" + apiKey
    $.ajax({
      url: uvIndexURL,
      method: "GET"
    }).then(function(response) {
     console.log(response);
     let repUV = response.value
     let repUVIndexEl = '<p>UV Index: '+repUV+'</p>'
    $("#mainWeather").append(repTempEl);
    $("#mainWeather").append(repHumEl);
    $("#mainWeather").append(repWindEl);
    $("#mainWeather").append(repUVIndexEl);
    

    });
 

    let repTempEl = '<p>Temp: '+repTemp+'&#8457;</p>';
    let repHumEl = '<p>Humidity: '+repHum+'%</p>';
    let repWindEl = '<p>Wind: '+repWind+' MPH</p>';




    
    
  });


  });

});
// function buildQueryURL() {
//     let apiKey = "51f413c7f43e62a941348d7c35e44a31"

//     $.getJSON(weatherURL + apiKey);

// API call: api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


















