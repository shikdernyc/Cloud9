const express = require('express');
const eventEmitter = require('events').EventEmitter;
const event = new eventEmitter();
const router = express.Router();

//Home Route
router.route('/').get((req, res) => {
    // res.send("Landing Page");
    res.render('index.pug', {});

});


//TODO: Get request using Google GEO API
//Requesting a location
router.route('/location').get((req, res) => {
    event.emit('get-forecast', res, req.url.substring(req.url.indexOf('address=') + 8,req.url.length)); //Parses the address
});

module.exports = {router, event};
