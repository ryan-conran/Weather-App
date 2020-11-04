let city = "Minneapolis";
let apiKey = "51f413c7f43e62a941348d7c35e44a31";
let weatherURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" +apiKey;

$.ajax({
    url: weatherURL,
    method: "GET"
  }).then(function(response) {
      console.log(response);

  });

// function buildQueryURL() {
//     let apiKey = "51f413c7f43e62a941348d7c35e44a31"

//     $.getJSON(weatherURL + apiKey);

// API call: api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


















