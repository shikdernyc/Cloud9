const https = require('https');
const url = 'https://maps.googleapis.com/maps/api/geocode/';

class LocationParser{
    constructor(api)
    {
        this.api = api;
    }

    getJSONData (address) {
        let link = url + "json?address=" + address + "&" + "key=" + api;
        https.get(link, res => {
            let JSONData = "";
            res.on('data', data => {
                JSONData += data;
            });

            res.on('end', () => {
                JSONData = JSON.parse(JSONData);
                console.dir(JSONData)
            })
        })
    }
}

// let address='1600+Amphitheatre+Parkway,+Mountain+View,+CA';
// getJSONData(address);
console.log(api);