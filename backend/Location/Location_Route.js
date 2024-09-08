const express = require('express')
const getLocation = express.Router();
const {getCurrentLocation} = require('./Location_Methods');

getLocation
    .route('/')
    .get(getCurrentLocation);  

module.exports = getLocation;