const https = require('https');
const url = 'https://maps.googleapis.com/maps/api/geocode/';

class LocationParser{
    constructor(api)
    {
        this.api = api;
    }
    /**
     * Get's JSON Data from a certain address
     * @param address - Location's Address
     */
    getJSONData (address,callback) {
        let link = url + "json?address=" + address + "&" + "key=" + this.api;
        https.get(link, res => {
            let JSONData = "";
            res.on('data', data => {
                JSONData += data;
            });

            res.on('end', (data) => {
                // JSONData += data;
                JSONData = JSON.parse(JSONData);
                callback(JSONData.status, JSONData.results);
            })
        })
    }

    /**
     * Returns the latitude and longitude values for a location
     * @param address - human writable address
     * @param callback - A json object with lat and lng
     */
    getCodedLocation(address, callback){
        this.getJSONData(address, (status, results)=>{
            if(status === 'OK')
            {
                callback(results[0].geometry.location);
            }
            else
            {
                callback(null);
            }
        });
    }
}

module.exports = LocationParser;