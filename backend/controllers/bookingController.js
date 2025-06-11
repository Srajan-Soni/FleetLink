const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');
const calculateRideDuration = require('../utils/calculateRideDuration');

const createBooking = async (req, res) => {
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    const rideDuration = calculateRideDuration(fromPincode, toPincode);
    const start = new Date(startTime);
    const end = new Date(start);
    end.setHours(start.getHours() + rideDuration);

    const conflict = await Booking.findOne({
      vehicleId,
      startTime: { $lt: end },
      endTime: { $gt: start },
    });

    if (conflict) return res.status(409).json({ error: 'Vehicle already booked in this slot' });

    const booking = await Booking.create({
      vehicleId,
      fromPincode,
      toPincode,
      startTime: start,
      endTime: end,
      customerId,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createBooking
};