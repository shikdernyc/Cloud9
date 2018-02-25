const express = require('express');
const app = express();
app.listen(80);

api = 'f7cd012e7d08b33dab0a475e9c0585e9';
latitude = 37.8267;
longitude = -122.4233;

const forecast = new Forecast(api,latitude,longitude);
forecast.getWeatherData();