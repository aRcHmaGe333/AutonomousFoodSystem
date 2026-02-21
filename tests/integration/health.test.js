const request = require('supertest');
const { createApp } = require('../../src/backend/app');

describe('API smoke: /health', () => {
  it('returns healthy status', async () => {
    const app = createApp();
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(typeof res.body.timestamp).toBe('string');
  });
});

