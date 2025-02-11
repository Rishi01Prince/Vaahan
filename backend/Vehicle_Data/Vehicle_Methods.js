const QuadTree = require('js-quadtree');
const Vehicle = require('../models/Vehicle');


const addVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json({ success: true, message: 'Vehicle added successfully', vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedVehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    res.status(200).json({ success: true, message: 'Vehicle updated successfully', updatedVehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);

    if (!deletedVehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    res.status(200).json({ success: true, message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json({ success: true, vehicles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    res.status(200).json({ success: true, vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



const getNearestVehicle = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance = 5000 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ success: false, message: 'Latitude and longitude are required' });
    }

    // Step 1: Fetch vehicles within maxDistance using MongoDB's geospatial query
    const nearbyVehicles = await Vehicle.find({
      "coordinates.coordinates": {
        $geoWithin: {
          $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], maxDistance / 6371000] // Convert meters to radians
        }
      },
      availability: true
    });

    if (!nearbyVehicles.length) {
      return res.status(200).json({ success: true, vehicles: [], message: "No nearby vehicles found" });
    }

    // Step 2: Initialize QuadTree covering a bounding box around the search area
    const quadTree = new QuadTree({
      x: parseFloat(longitude) - maxDistance, 
      y: parseFloat(latitude) - maxDistance,
      width: maxDistance * 2,
      height: maxDistance * 2
    });

    // Step 3: Insert all nearby vehicles into QuadTree
    nearbyVehicles.forEach(vehicle => {
      const [lng, lat] = vehicle.coordinates.coordinates;
      quadTree.insert({ x: lng, y: lat, data: vehicle });
    });

    // Step 4: Find the nearest vehicle using QuadTree
    const nearest = quadTree.findNearest({ x: parseFloat(longitude), y: parseFloat(latitude) });

    if (!nearest) {
      return res.status(200).json({ success: true, vehicles: [], message: "No nearby vehicles found" });
    }

    const result = {
      success: true,
      vehicle: nearest.data,
      googleMapsNavigationUrl: `https://www.google.com/maps/dir/?api=1&destination=${nearest.data.coordinates.coordinates[1]},${nearest.data.coordinates.coordinates[0]}`
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 7️⃣ Rent a Vehicle
const rentVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const vehicle = await Vehicle.findById(id);
    if (!vehicle || !vehicle.availability) {
      return res.status(400).json({ success: false, message: 'Vehicle not available' });
    }

    vehicle.availability = false;
    vehicle.rentedBy = userId;
    await vehicle.save();

    res.status(200).json({ success: true, message: 'Vehicle rented successfully', vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 8️⃣ Return a Vehicle
const returnVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findById(id);
    if (!vehicle || vehicle.availability) {
      return res.status(400).json({ success: false, message: 'Vehicle not currently rented' });
    }

    vehicle.availability = true;
    vehicle.rentedBy = null;
    await vehicle.save();

    res.status(200).json({ success: true, message: 'Vehicle returned successfully', vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};





module.exports = { addVehicle, updateVehicle, deleteVehicle, getAllVehicles, getVehicleById, getNearestVehicle, rentVehicle, returnVehicle };
