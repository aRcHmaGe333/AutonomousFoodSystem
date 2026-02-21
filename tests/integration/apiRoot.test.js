const request = require('supertest');
const { createApp } = require('../../src/backend/app');

describe('API smoke: /api', () => {
  it('returns API metadata and endpoints', async () => {
    const app = createApp();
    const res = await request(app).get('/api');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('endpoints');
    expect(res.body.endpoints).toHaveProperty('recipes');
    expect(res.body.endpoints).toHaveProperty('growing');
  });
});

