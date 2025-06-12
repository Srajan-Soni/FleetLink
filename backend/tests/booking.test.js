const request = require("supertest");
const app = require("../app");
const Vehicle = require("../models/Vehicle");
const Booking = require("../models/Booking");

describe("Vehicle Booking Validation", () => {
  it("should NOT return vehicle if booking overlaps", async () => {
  const vehicle = await Vehicle.create({
    name: "Truck A",
    capacityKg: 1000,
    tyres: 6,
  });


  await Booking.create({
    vehicleId: vehicle._id,
    fromPincode: "123456",
    toPincode: "654321",
    startTime: new Date("2025-06-15T10:00:00Z"),
    endTime: new Date("2025-06-15T14:00:00Z"),
    customerId: "cust123",
  });

  
  const response = await request(app).get("/api/vehicles/available").query({
    capacityRequired: 800,
    fromPincode: "123456",
    toPincode: "654321",
    startTime: "2025-06-15T12:00:00Z"
  });

  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(0); 
});


  it("should return the vehicle if it has no booking overlap", async () => {
    const vehicle = await Vehicle.create({
      name: "Truck B",
      capacityKg: 1000,
      tyres: 6,
    });

  
    await Booking.create({
      vehicleId: vehicle._id,
      fromPincode: "123456",
      toPincode: "654321",
      startTime: new Date("2025-06-15T06:00:00Z"),
      endTime: new Date("2025-06-15T09:00:00Z"),
      customerId: "cust2",
    });

    const response = await request(app).get("/api/vehicles/available").query({
      capacityRequired: 800,
      fromPincode: "123456",
      toPincode: "654321",
      startTime: "2025-06-15T10:00:00Z",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body[0].name).toBe("Truck B");
  });
});
