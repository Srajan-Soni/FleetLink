const express = require('express');
const router = express.Router();
const { createBooking, deleteBooking, getBookings } = require('../controllers/bookingController');

router.post('/', createBooking);
router.get('/:customerId',getBookings)
router.delete('/:id',deleteBooking)

module.exports = router;
