const Emitter = require('events');
const https = require('https');
const forecastParser = require('./ForecastParser.js');

class Forecast {
    constructor(api) {
        this.api = api;
        this.current = {};
        this.updater = new Emitter();
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
                // console.dir(JSONData);
                this.current = forecastParser.currentData(JSONData.currently);
                this.updater.emit("update");
            })
        })
    }
}

module.exports = Forecast