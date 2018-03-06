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
    lp.getCodedLocation(location, (geoLocation, formattedAddress)=>{
        //Get's weather data for location
        if(geoLocation === null)
        {
            res.redirect('/');
            // res.send("Invalid Address")
        }
        else {
            weather.getWeatherData(geoLocation.lat, geoLocation.lng, (current, hourly, daily) => {
                //Updates Weather data
                updateHTML(res, formattedAddress, {current, hourly, daily});
            })
        };
    });
});


//Update weather display
const updateHTML = function(res, address, weather)
{
    //TODO: Create a HTML handler package to handle this and future HTML related things
    res.statusCode = 200;
    res.contentType('text/html');
    // console.dir({currently, hours});
    res.locals.hours = weather.hourly;
    res.locals.days = weather.daily;
    res.locals.formattedAddress = address;
    res.render('index.pug', weather.current);
    res.end();
};
