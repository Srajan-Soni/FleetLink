const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");
const calculateRideDuration = require("../utils/calculateRideDuration");

const createBooking = async (req, res) => {
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } =
      req.body;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

    const rideDuration = calculateRideDuration(fromPincode, toPincode);
    const start = new Date(startTime);
    const end = new Date(start);
    end.setHours(start.getHours() + rideDuration);

    const conflict = await Booking.findOne({
      vehicleId,
      startTime: { $lt: end },
      endTime: { $gt: start },
    });

    if (conflict)
      return res
        .status(409)
        .json({ error: "Vehicle already booked in this slot" });

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

const getBookings = async (req, res) => {
  try {
    console.log('Fetching bookings for customer:', req.params.customerId);
    const customerId = req.params.customerId; 
    const bookings = await Booking.find({customerId}).populate({
        path: 'vehicleId',
      select: 'name capacityKg tyres',
    }).sort({ startTime: -1 });
    console.log('Bookings fetched:', bookings);
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};  

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createBooking,
  deleteBooking,
  getBookings
};
