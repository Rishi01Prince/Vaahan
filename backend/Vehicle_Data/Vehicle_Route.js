const express = require('express');
const vehicles = express.Router();
const { getVehicles, addVehicle, updateVehicle, deleteVehicle, addVehiclesInBulk } = require('./Vehicle_Methods');

vehicles
    .route('/')
    .get(getVehicles)
    .post(addVehicle)
    .patch(updateVehicle)
    .delete(deleteVehicle);

vehicles
    .route('/bulk')
    .post(addVehiclesInBulk); 

module.exports = vehicles;
