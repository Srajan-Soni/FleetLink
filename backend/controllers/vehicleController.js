const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const calculateRideDuration = require('../utils/calculateRideDuration');

const addVehicle = async (req, res) => {
  try {
    const { name, capacityKg, tyres } = req.body;
    console.log('Adding vehicle:', { name, capacityKg, tyres });
    if (!name || !capacityKg || !tyres) return res.status(400).json({ error: 'Missing fields' });

    const vehicle = await Vehicle.create({ name, capacityKg, tyres });
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAvailableVehicles = async (req, res) => {
  try {
    const { fromPincode, toPincode, startTime, capacityRequired } = req.query;

    const rideDuration = calculateRideDuration(fromPincode, toPincode);
    const start = new Date(startTime);
    const end = new Date(start);
    end.setHours(start.getHours() + rideDuration);

    const bookedVehicleIds = await Booking.find({
      startTime: { $lt: end },
      endTime: { $gt: start },
    }).distinct("vehicleId");

    const vehicles = await Vehicle.find({
      _id: { $nin: bookedVehicleIds },
      capacityKg: { $gte: capacityRequired },
    });

    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addVehicle,
  getAvailableVehicles,
};
