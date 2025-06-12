# 🚛 FleetLink - Vehicle Booking System (MERN Stack)

FleetLink is a logistics vehicle booking web application built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to:
- Add new vehicles
- Search available vehicles
- Book vehicles with time conflict handling
- View and delete bookings

## 🧩 Features

- Add vehicle (name, capacity, tyres)
- Search vehicles by capacity, route, and time
- Book vehicle with overlap validation
- View all bookings
- Delete existing bookings
- Success / Error messages via `react-toastify`
- Loading placeholders via `react-loading-skeleton`

 ### Steps to installation ###

## ⚙️ Backend Setup

### 🔧 Prerequisites
- Node.js
- MongoDB (local or Atlas)

### 📦 Installation

cd backend
npm install 

# add .env file 
Add MONGO_URI and your mongodb url 
and PORT (optional)

# start and test 
npm start 
npm test 

## ⚙️ Frontend Setup

cd frontend
npm install 
npm run dev 

### Ride duration calculation formula

To estimate ride time between two pincodes, we use:

Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24








