require('dotenv').config();
const express = require('express');
const app = express();
const Forecast = require('./src/Forecast');
const LocationParser = require('./src/LocationParser');
const router = require('./src/Router');

//Starting Server
const port = 3000;
app.listen(port);
console.log("Server Running on: localhost:" + port);

//Populating Data from .env files
forecastAPI = process.env.FORECAST_API;
geocodingAPI = process.env.GEO_API;


let weather = new Forecast(forecastAPI);
let lp = new LocationParser(geocodingAPI);

//Setting up routing
app.use(router.router);

//Listening to when router get's a request from user about weather from a location
router.event.on("get-forecast",(res,location)=>{
    //Asks the Location Parser to return latitude and longitude values
    lp.getCodedLocation(location, (address)=>{
        //Get's weather data for location
        weather.getWeatherData(address.lat,address.lng, (current, hourly, daily)=>{
            //Updates Weather data
            updateHTML(res, current, hourly, daily);
        });
    });
});


//Update weather display
const updateHTML = function(res, currently, hours, days)
{
    //TODO: Create a HTML handler package to handle this and future HTML related things
    res.statusCode = 200;
    res.contentType('text/html');
    console.dir({currently, hours});
    res.locals.hours = hours;
    res.locals.days = days;
    res.render('index.pug', currently);
    res.end();
};
