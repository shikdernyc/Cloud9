const express = require('express');
const app = express();
require('dotenv').config();
const Forecast = require('./data/Forecast');

const port = 80;

app.listen(port);

// console.log("Server Running on: localhost:" + port);

const htmlUpdater = function(res, currently, hours, days)
{
    res.render('index.pug', {currently, hours, days});
};

api = process.env.api;
latitude = 37.8267;
longitude = -122.4233;
let weather = new Forecast(api);

weather.updater.on("update" , ()=>{
    console.dir(weather.current);
    console.dir(weather.hourly);
    console.dir(weather.daily);

});


app.get('/',(req, res) =>{
    weather.getWeatherData(latitude, longitude);
    weather.updater.on("update", ()=>{
        htmlUpdater(res, weather.current, weather.hourly, weather.daily);
    })
});
