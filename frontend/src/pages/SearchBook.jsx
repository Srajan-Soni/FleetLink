import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function SearchBook() {
  const [formData, setFormData] = useState({
    capacityRequired: '',
    fromPincode: '',
    toPincode: '',
    startTime: ''
  });
  const [vehicles, setVehicles] = useState([]);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const { capacityRequired, fromPincode, toPincode, startTime } = formData;

      const res = await axios.get(`http://localhost:5000/api/vehicles/available`, {
        params: {
          capacityRequired,
          fromPincode,
          toPincode,
          startTime
        }
      });
      console.log('Available vehicles:', res.data);
      setVehicles(res.data);
      setIsError(false);
      setMessage(res.data.length > 0 ? 'Available vehicles listed below.' : 'No vehicles available for given search.');
    } catch {
      setIsError(true);
      toast.error(' Error fetching vehicles. Please try again.');
      setVehicles([]);
    }
  };

  const handleBook = async (vehicleId) => {
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        vehicleId,
        fromPincode: formData.fromPincode,
        toPincode: formData.toPincode,
        startTime: formData.startTime,
        customerId: 'customer124' 
      });

      setIsError(false);
      toast.success(' Booking successful!');
      setVehicles(vehicles.filter(v => v._id !== vehicleId));
    } catch (err) {
      setIsError(true);
      toast.error(' Vehicle became unavailable or booking failed.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-4 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">Search & Book a Vehicle</h2>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          name="capacityRequired"
          type="number"
          placeholder="Required Capacity (KG)"
          onChange={handleChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          name="fromPincode"
          type="text"
          placeholder="From Pincode"
          onChange={handleChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          name="toPincode"
          type="text"
          placeholder="To Pincode"
          onChange={handleChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          name="startTime"
          type="datetime-local"
          onChange={handleChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Search Availability
        </button>
      </div>

      {message && (
        <div className={`text-sm mb-4 px-4 py-2 rounded ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      {vehicles.length > 0 && (
        <div className="space-y-4">
          {vehicles.map(vehicle => (
            <div key={vehicle._id} className="border rounded-md p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">{vehicle.name}</h3>
              <p> Capacity: {vehicle.capacityKg} KG</p>
              <p>Tyres: {vehicle.tyres}</p>
              <p> Estimated Duration: {vehicle.estimatedRideDurationHours} hrs</p>
              <button
                onClick={() => handleBook(vehicle._id)}
                className="mt-3 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
