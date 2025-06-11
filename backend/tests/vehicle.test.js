const request = require('supertest');
const app = require('../app'); 

describe('POST /api/vehicles', () => {
  it('should add a new vehicle', async () => {
    const res = await request(app)
      .post('/api/vehicles')
      .send({
        name: 'Truck A',
        capacityKg: 1000,
        tyres: 6
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Truck A');
  });
});
