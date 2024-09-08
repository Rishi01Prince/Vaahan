const express = require('express')
const orders = express.Router();
const {getMyOrders, addOrder} = require('./Orders_Methods');

orders
    .route('/')
    .get(getMyOrders)
    .post(addOrder);

module.exports = orders;