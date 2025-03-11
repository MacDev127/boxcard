// src/tests/boxer.test.js
const request = require('supertest');
const app = require('../app'); // The Express app
const prisma = require('../config/db');

describe('Boxer API', () => {
  beforeAll(async () => {
    // Optionally set up test data or migrations
  });

  afterAll(async () => {
    // Clean up or close DB connection
    await prisma.$disconnect();
  });

  it('should create a new boxer', async () => {
    const res = await request(app).post('/api/boxers').send({
      name: 'Test Boxer',
      country: 'Test Country',
      age: 25,
      weight: 160,
      stance: 'Orthodox',
      level: 'elite',
      fightsWon: 10,
      fightsLost: 1,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Boxer');
  });

  it('should fetch all boxers', async () => {
    const res = await request(app).get('/api/boxers');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
