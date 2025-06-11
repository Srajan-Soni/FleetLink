import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddVehicle() {
  const [formData, setFormData] = useState({ name: '', capacityKg: '', tyres: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/vehicles', {
        name: formData.name,
        capacityKg: parseInt(formData.capacityKg),
        tyres: parseInt(formData.tyres),
      });

      if (res.status !== 201) {
        throw new Error('Failed to add vehicle');
      }

      toast.success('Vehicle added successfully!');
      console.log('Vehicle added:', res.data);
      setFormData({ name: '', capacityKg: '', tyres: '' });
    } catch (err) {
      toast.error('Error adding vehicle. Please check your input.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-center text-blue-700">Add New Vehicle</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Vehicle Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Truck A"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Capacity (KG)</label>
          <input
            type="number"
            name="capacityKg"
            placeholder="e.g. 1000"
            value={formData.capacityKg}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Tyres</label>
          <input
            type="number"
            name="tyres"
            placeholder="e.g. 6"
            value={formData.tyres}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
