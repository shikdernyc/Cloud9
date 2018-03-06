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

let lp = new LocationParser('AIzaSyCBLWfBy_il1velXGorewJXfriEsQ0grbc');
let address='1600+Amphitheatre+Parkway,+Mountain+View,+CA';

lp.getCodedLocation(address, (location)=>{
    console.dir(location);
})