import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    const customerId = 'customer124'
    try {
      const res = await axios.get(`http://localhost:5000/api/bookings/${customerId}`);
      console.log('Bookings fetched:', res.data);
      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      toast.error('Error fetching bookings');
    }
  };

  const cancelBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      toast.success('Booking cancelled');
      fetchBookings(); 
    } catch (err) {
      toast.error('Failed to cancel booking');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
        <p className='bg-gray-300 text-2xl text-black'><Skeleton count={10} /></p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 ">My Bookings</h2>
      <div className='mt-4 p-2 max-w-full bg-gray-100 ' >
      {bookings.length === 0 ? (
        <p className='bg-gray-300 m-auto p-10 text-2xl text-black'>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="max-w-xl  mx-auto bg-white shadow-md rounded-lg p-5 mb-4 space-y-3">
            <div className='flex justify-between '><strong>Vehicle:</strong>  {booking.vehicleId.name}</div>
            <div className='flex justify-between '><strong>From:</strong> {booking.fromPincode}</div>
            <div className='flex justify-between '><strong>To:</strong> {booking.toPincode}</div>
            <div className='flex justify-between '><strong>Capacity:</strong> {booking.vehicleId.capacityKg}</div>
            <div className='flex justify-between '><strong>Tyres:</strong> {booking.vehicleId.tyres}</div>
            <div className='flex justify-between '><strong>Start Time:</strong> {new Date(booking.startTime).toLocaleString()}</div>
            <button
              className="mt-2 bg-red-500 cursor-pointer text-white px-4 py-1 rounded"
              onClick={() => cancelBooking(booking._id)}
            >
              Cancel Booking
            </button>
          </div>
        ))
      )}
      </div>
    </div>
  );
}
