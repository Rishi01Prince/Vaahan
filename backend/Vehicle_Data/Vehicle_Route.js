const express = require('express');
const {
  addVehicle,
  updateVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehicleById,
  getNearestVehicle,
  rentVehicle,
  returnVehicle
} = require('./vehicleController');

const router = express.Router();

router.post('/add', addVehicle);
router.put('/update/:id', updateVehicle);
router.delete('/delete/:id', deleteVehicle);
router.get('/all', getAllVehicles);
router.get('/:id', getVehicleById);
router.get('/nearest', getNearestVehicle); 
router.post('/rent/:id', rentVehicle);  
router.post('/return/:id', returnVehicle);  

module.exports = router;
