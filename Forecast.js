function Forecast(api,latitude,longitude)
{
    this.api = api;
    this.latitude = latitude;
    this.longitude = longitude;

    Forecast.prototype.getWeatherData = function(){
        console.log("Getting Weather Data");
        const https = require('https');
        let link = 'https://api.darksky.net/forecast/' + api + '/' + latitude + ',' + longitude;
        let JSONData = "";

        https.get(link,res=>{
          res.on('data',data =>{
              JSONData += data;
          });
          res.on('end',() =>
          {
              JSONData = JSON.parse(JSONData);
              console.dir(JSONData);
          })
        })
    };

    module.exports.Forecast = Forecast;
}