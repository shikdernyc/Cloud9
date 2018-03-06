const express = require('express');
const eventEmitter = require('events').EventEmitter;
const event = new eventEmitter();
const router = express.Router();

//Home Route
router.route('/').get((req, res)=> {
    // res.send("Landing Page");
    res.render('index.pug', {});

});

//TODO: Get request using Google GEO API
//Requesting a location
router.route('/location').get((req, res)=>{
    url = req.url;
    latitude = parseFloat(url.substring(url.indexOf('latitude=') + 9, url.indexOf('&')));
    longitude = parseFloat(url.substring(url.indexOf('longitude=') + 10));
    event.emit('get-forecast', res, latitude, longitude);
});

module.exports = {router,event};
