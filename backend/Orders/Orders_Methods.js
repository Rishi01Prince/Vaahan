const mongoose = require('mongoose');
const Order = require('../models/Orders');
const Vehicle = require('../models/Vehicle');
const redisClient = require('../redis');  // Redis connection
const Redlock = require('redlock');

// Initialize Redis-based locking
const redlock = new Redlock([redisClient], { retryCount: 3 });

const addOrder = async (req, res) => {
    try {
        const { new_orders, email } = req.body;

        for (const order of new_orders) {
            const vehicleId = order.vehicleId;

            let lock;
            try {
                lock = await redlock.lock(`locks:vehicle:${vehicleId}`, 5000); 
            } catch (err) {
                return res.status(400).json({ success: false, error: 'Vehicle booking in process, try again later.' });
            }

            const vehicle = await Vehicle.findOneAndUpdate(
                { _id: vehicleId, availability: true },  
                { $set: { availability: false, rentedBy: email } },  
                { new: true }
            );

            if (!vehicle) {
                await lock.unlock();
                return res.status(400).json({ success: false, error: 'Vehicle already booked' });
            }

            await Order.findOneAndUpdate(
                { email },
                { $push: { order_data: order } },
                { new: true, upsert: true }
            );

            
            await lock.unlock();
        }

        res.json({ success: true, message: "Booking confirmed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'An error occurred while processing the order.' });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const myData = await Order.findOne({ email: req.body.email });
        res.json({ orderData: myData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'An error occurred while fetching orders.' });
    }
};

module.exports = { addOrder, getMyOrders };
