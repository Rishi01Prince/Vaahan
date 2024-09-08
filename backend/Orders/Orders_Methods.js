const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

const addOrder =  async (req, res) => {
    try {
        const { new_orders, email } = req.body;

        const updated_value = await Order.findOneAndUpdate(
            { email },
            { $push: { order_data: { $each: new_orders } } },
            { new: true, upsert: true }
        );
        res.json({ success: true  , Orders : updated_value  });
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, error: 'An error occurred while processing the order.' });
    }
}

const getMyOrders = async (req, res) => {
    try {
        const myData = await Order.findOne({ email: req.body.email });
        console.log(myData);
        res.json({ orderData: myData });
    } 
    catch (error) {
        console.error(error);
        res.json({ success: false, error: 'An error occurred while processing the order.' });
    }
}


const orderMethods = {
    getMyOrders: getMyOrders,
    addOrder: addOrder
};
  
module.exports = orderMethods;