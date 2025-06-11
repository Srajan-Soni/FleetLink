const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const calculateRideDuration = require('../utils/calculateRideDuration');

const addVehicle = async (req, res) => {
  try {
    const { name, capacityKg, tyres } = req.body;
    if (!name || !capacityKg || !tyres) return res.status(400).json({ error: 'Missing fields' });

    const vehicle = await Vehicle.create({ name, capacityKg, tyres });
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAvailableVehicles = async (req, res) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

    const rideDuration = calculateRideDuration(fromPincode, toPincode);
    const start = new Date(startTime);
    const end = new Date(start);
    end.setHours(start.getHours() + rideDuration);

    const allVehicles = await Vehicle.find({ capacityKg: { $gte: Number(capacityRequired) } });

    const conflictingBookings = await Booking.find({
      startTime: { $lt: end },
      endTime: { $gt: start },
    });

    const bookedVehicleIds = conflictingBookings.map(b => b.vehicleId.toString());

    const availableVehicles = allVehicles.filter(
      v => !bookedVehicleIds.includes(v._id.toString())
    );

    const response = availableVehicles.map(v => ({
      ...v.toObject(),
      estimatedRideDurationHours: rideDuration,
    }));

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addVehicle,
  getAvailableVehicles,
};
