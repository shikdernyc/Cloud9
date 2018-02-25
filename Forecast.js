const Emitter = require('events');
const https = require('https');

class Forecast {
    constructor(api) {
        this.api = api;
        this.current = {};
        this.updater = new Emitter();
    }

    //Get's weather data from a certain location
    getWeatherData(latitude, longitude) {
        // console.log("Getting Weather Data");
        let link = 'https://api.darksky.net/forecast/' + this.api + '/' + latitude + ',' + longitude;
        let JSONData = "";

        https.get(link, res => {
            res.on('data', data => {
                JSONData += data;
            });
            res.on('end', () => {
                JSONData = JSON.parse(JSONData);
                // console.dir(JSONData);
                this.current = this.updateCurrently(JSONData.currently);
                this.updater.emit("update");
            })
        })
    }

    //Update Current Data
    updateCurrently(JSONCurrently)
    {
        return{
            summary: JSONCurrently.summary,
            icon: JSONCurrently.icon,
            temperature: JSONCurrently.temperature,
            apparentTemperature: JSONCurrently.apparentTemperature,
            humidity: JSONCurrently.humidity,
            pressure: JSONCurrently.pressure,
            windSpeed: JSONCurrently.windSpeed,
            uvIndex: JSONCurrently.uvIndex,
            visibility: JSONCurrently.uvIndex
        }
    }

}

module.exports = Forecast