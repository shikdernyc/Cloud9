const https = require('https');
const forecastParser = require('./ForecastParser.js');
class Forecast {
    constructor(api) {
        this.api = api;
        this.current = {};
        this.hourly = [];
        this.daily = [];
        this.timeZone="";
    }

    /**
     * Get weather from a certain location
     * @param latitude - Location's Latitude
     * @param longitude - Location's Longitude
     * @param callback - Returns a function with current, hourly and daily data
     */
    getWeatherData(latitude, longitude, callback) {
        let link = 'https://api.darksky.net/forecast/' + this.api + '/' + latitude + ',' + longitude;
        let JSONData = "";

        https.get(link, res => {
            console.log(res.statusCode);
            res.on('data', data => {
                JSONData += data;
            });

            //Returns all the data in a callback function at the end
            res.on('end', () => {
                JSONData = JSON.parse(JSONData);
                console.log("JSONData Received from Forecast.io")
                this.timeZone = JSONData.timezone;
                this.current = forecastParser.currentData(JSONData.currently);
                this.hourly = forecastParser.hourlyData(JSONData.hourly, 24);
                this.daily = forecastParser.dailyData(JSONData.daily, 7);
                callback(this.current, this.hourly, this.daily);
            })
        })
    }
}

module.exports = Forecast;