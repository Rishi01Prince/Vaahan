const Vehicles = require('../models/Vehicle');

// Get all vehicles
const getVehicles = async (req, res) => {
  try {
    const data = await Vehicles.find({});
    res.status(200).send({ "vehicle": data });
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ message: error.message });
  }
}

// Add a single vehicle
const addVehicle = async (req, res) => {
  try {
    const {
      categoryName,
      name,
      options,
      image,
      owneremail,
      phone,
      location,
      pincode,
      availability,
      ownerName,
      ownerPhone,
      halfDayPrice,
      fullDayPrice,
      year,
      type,
      latitude,
      longitude
    } = req.body;

    const newVehicleData = {
      categoryName,
      name,
      options,
      image,
      owneremail,
      phone,
      location,
      pincode,
      availability,
      ownerName,
      ownerPhone,
      halfDayPrice,
      fullDayPrice,
      year,
      type
    };

    // Include coordinates only if both latitude and longitude exist
    if (latitude !== undefined && longitude !== undefined) {
      newVehicleData.coordinates = { latitude, longitude };
    }

    // Check if vehicle with the same name and ownerEmail already exists
    const isVehicleExist = await Vehicles.findOne({ name: newVehicleData.name, owneremail: newVehicleData.owneremail });

    if (!isVehicleExist) {
      const newVehicle = await Vehicles.create(newVehicleData);
      res.json({ success: true, message: 'Vehicle added successfully', newVehicle });
    } else {
      res.json({ success: false, message: 'Vehicle already exists' });
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
}

// Update an existing vehicle
const updateVehicle = async (req, res) => {
  try {
    const {
      categoryName,
      name,
      options,
      image,
      owneremail,
      phone,
      location,
      pincode,
      availability,
      ownerName,
      ownerPhone,
      halfDayPrice,
      fullDayPrice,
      year,
      type,
      _id,
      latitude,
      longitude
    } = req.body;

    const newData = {
      categoryName,
      name,
      options,
      image,
      owneremail,
      phone,
      location,
      pincode,
      availability,
      ownerName,
      ownerPhone,
      halfDayPrice,
      fullDayPrice,
      year,
      type
    };

    // Include coordinates only if both latitude and longitude exist
    if (latitude !== undefined && longitude !== undefined) {
      newData.coordinates = { latitude, longitude };
    }

    const updatedVehicle = await Vehicles.findOneAndUpdate({ _id }, newData, { new: true });
    res.json({ success: true, message: 'Vehicle updated successfully', newVehicle: updatedVehicle });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
}

// Delete a vehicle
const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedVehicle = await Vehicles.findOneAndDelete({ _id: id });
    res.json({ success: true, message: 'Vehicle deleted successfully', vehicle: deletedVehicle });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
}

// Add multiple vehicles in bulk
const addVehiclesInBulk = async (req, res) => {
  try {
    const vehicles = req.body;
    if (!Array.isArray(vehicles) || vehicles.length === 0) {
      return res.status(400).send({ success: false, message: 'Invalid input' });
    }

    const processedVehicles = vehicles.map(vehicle => {
      const vehicleData = { ...vehicle };

      // Include coordinates only if both latitude and longitude exist
      if (vehicle.latitude !== undefined && vehicle.longitude !== undefined) {
        vehicleData.coordinates = {
          latitude: vehicle.latitude,
          longitude: vehicle.longitude
        };
      }

      // Remove latitude and longitude fields if they're in the main object
      delete vehicleData.latitude;
      delete vehicleData.longitude;

      return vehicleData;
    });

    const result = await Vehicles.insertMany(processedVehicles);
    res.status(201).send({ success: true, message: 'Vehicles added successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
}

const vehicleMethods = {
  getVehicles,
  addVehicle,
  deleteVehicle,
  updateVehicle,
  addVehiclesInBulk
};

module.exports = vehicleMethods;
