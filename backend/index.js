require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

const cors = require('cors');
// const vehicleRoutes = require('./routes/vehicleRoutes');
// const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/api/vehicles', vehicleRoutes);
// app.use('/api/bookings', bookingRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));

  