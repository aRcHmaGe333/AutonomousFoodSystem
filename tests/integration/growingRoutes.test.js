const request = require('supertest');
const { createApp } = require('../../src/backend/app');

describe('Growing routes', () => {
  test('lists growing modules', async () => {
    const app = createApp();
    const res = await request(app).get('/api/growing/modules');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.modules)).toBe(true);
    expect(res.body.modules.length).toBeGreaterThan(0);
    expect(res.body.pagination).toBeDefined();
  });

  test('retrieves a specific growing module', async () => {
    const app = createApp();
    const listRes = await request(app).get('/api/growing/modules');
    const moduleId = listRes.body.modules[0].id;

    const res = await request(app).get(`/api/growing/modules/${moduleId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(moduleId);
    expect(res.body).toHaveProperty('moduleType');
    expect(res.body).toHaveProperty('environmentalSystems');
  });

  test('creates a growing module', async () => {
    const app = createApp();
    const res = await request(app)
      .post('/api/growing/modules')
      .send({
        name: 'Integration-Greenhouse',
        moduleType: 'greenhouse',
        capacity: 250,
        status: 'active'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Integration-Greenhouse');
    expect(res.body.moduleType).toBe('greenhouse');
  });
});