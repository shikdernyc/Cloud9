require('dotenv').config();
const express = require('express');
const app = express();
const Forecast = require('./src/Forecast');
const router = require('./src/Router');

//Starting Server
const port = 3000;
app.listen(port);
console.log("Server Running on: localhost:" + port);

//Populating Data from .env files
geocodingAPI = process.env.GEO_API;
forecastAPI = process.env.FORECAST_API;

//Setting up routing
app.use(router.router);

//Listening to when router get's a request from user about weather from a location
router.event.on("get-forecast",(res,latitude,longitude)=>{
    weather.getWeatherData(latitude,longitude, (current, hourly, daily)=>{
        updateHTML(res, current, hourly, daily);
    });
});

// latitude = 37.8267;
// longitude = -122.4233;
let weather = new Forecast(forecastAPI);


const updateHTML = function(res, currently, hours, days)
{
    res.statusCode = 200;
    res.contentType('text/html');
    console.dir({currently, hours});
    res.locals.hours = hours;
    res.locals.days = days;
    res.render('index.pug', currently);
    res.end();
};
