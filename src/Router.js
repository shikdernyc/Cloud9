const express = require('express');
const eventEmitter = require('events').EventEmitter;
const event = new eventEmitter();
const router = express.Router();

//Home Route
router.route('/').get((req, res) => {
    // res.send("Landing Page");
    res.statusCode = 200;
    // event.emit('get-forecast', res, 'Google+Building+41%2C+1600+Amphitheatre+Pkwy%2C+Mountain+View%2C+CA+94043%2C+USA');
    res.render('index.pug', {});

});


//TODO: Get request using Google GEO API
//Requesting a location
router.route('/location').get((req, res) => {
    event.emit('get-forecast', res, req.url.substring(req.url.indexOf('address=') + 8, req.url.length)); //Parses the address
});

router.route('*').get((req, res) => {
    res.statusCode = 404;
    res.send("Wow there slow down" +
        "\n This page does not exist")
});

module.exports = {router, event};
