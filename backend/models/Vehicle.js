const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },  
  location: { type: String, required: true },  
  ownerPhone: { type: String, required: true },
  halfDayPrice: { type: Number, required: true },
  fullDayPrice: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  rentedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  coordinates: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }  
  }
});

VehicleSchema.index({ coordinates: '2dsphere' });

const Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;
