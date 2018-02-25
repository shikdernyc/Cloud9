const express = require('express');
// const app = express();
const Forecast = require('./Forecast');
require('dotenv').config()


// app.listen(80);

api = process.env.api;
latitude = 37.8267;
longitude = -122.4233;
let weather = new Forecast(api);

weather.getWeatherData(latitude, longitude);

weather.updater.on("update" , ()=>{
    console.log("Event Occured")
    console.log(weather.current);
});
