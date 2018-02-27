const https = require('https');
const forecastParser = require('./ForecastParser.js');
const Emitter = require('events');
class Forecast {
    constructor(api) {
        this.api = process.env.api;
        this.updater = new Emitter();
        this.current = {};
        this.hourly = [];
        this.daily = [];
        this.timeZone="";
    }

    //Get's weather data from a certain location
    getWeatherData(latitude, longitude) {
        let link = 'https://api.darksky.net/forecast/' + this.api + '/' + latitude + ',' + longitude;
        let JSONData = "";

        https.get(link, res => {
            res.on('data', data => {
                JSONData += data;
            });
            res.on('end', () => {
                JSONData = JSON.parse(JSONData);
                console.log("JSONData Received from Forecast.io")
                this.timeZone = JSONData.timezone;
                this.current = forecastParser.currentData(JSONData.currently);
                this.hourly = forecastParser.hourlyData(JSONData.hourly);
                this.daily = forecastParser.dailyData(JSONData.daily);
                this.updater.emit("update");
            })
        })
    }
}

module.exports = Forecast