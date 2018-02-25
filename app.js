const express = require('express');
// const app = express();
const Forecast = require('./Forecast');

// app.listen(80);

api = 'f7cd012e7d08b33dab0a475e9c0585e9';
// new Forecast(api)
latitude = 37.8267;
longitude = -122.4233;
let weather = new Forecast(api);
weather.getWeatherData(latitude, longitude);

weather.updater.on("update" , ()=>{
    console.log("Event Occured")
    console.dir(weather.current);
});
