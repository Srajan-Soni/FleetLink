import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-full px-4 sm:px-6 lg:px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-700 ">FleetLink
            <span className="text-sm text-gray-500"> Logistics Vehicle Booking System</span>
        </h1>

        <nav className="space-x-4">
          <NavLink
            to="/add-vehicle"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Add Vehicle
          </NavLink>

          <NavLink
            to="/search-book"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium  ${
                isActive
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Search & Book
          </NavLink>

            <NavLink
            to="/booking-list"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium  ${
                isActive
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Bookings
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
