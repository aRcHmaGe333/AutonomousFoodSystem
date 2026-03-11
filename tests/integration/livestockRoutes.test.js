const request = require('supertest');
const { createApp } = require('../../src/backend/app');

describe('Livestock routes', () => {
  test('lists livestock units', async () => {
    const app = createApp();
    const res = await request(app).get('/api/livestock/units');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.units)).toBe(true);
    expect(res.body.units.length).toBeGreaterThan(0);
    expect(res.body.pagination).toBeDefined();
  });

  test('retrieves a specific livestock unit', async () => {
    const app = createApp();
    const listRes = await request(app).get('/api/livestock/units');
    const unitId = listRes.body.units[0].id;

    const res = await request(app).get(`/api/livestock/units/${unitId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(unitId);
    expect(res.body).toHaveProperty('unitType');
    expect(res.body).toHaveProperty('milkingSystem');
  });

  test('creates a livestock unit', async () => {
    const app = createApp();
    const res = await request(app)
      .post('/api/livestock/units')
      .send({
        name: 'Integration-Dairy',
        unitType: 'dairy',
        status: 'active'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Integration-Dairy');
    expect(res.body.unitType).toBe('dairy');
  });

  test('returns a livestock hardware abstraction surface', async () => {
    const app = createApp();
    const listRes = await request(app).get('/api/livestock/units');
    const unitId = listRes.body.units[0].id;

    const res = await request(app).get(`/api/livestock/units/${unitId}/hardware/abstraction`);

    expect(res.statusCode).toBe(200);
    expect(res.body.subsystems).toHaveProperty('corridor');
    expect(res.body.subsystems).toHaveProperty('sanitation');
  });

  test('advances livestock simulation state', async () => {
    const app = createApp();
    const listRes = await request(app).get('/api/livestock/units');
    const unitId = listRes.body.units[0].id;

    const res = await request(app)
      .post(`/api/livestock/units/${unitId}/simulation/step`)
      .send({ arrivals: 12, completions: 5, advanceSanitationCycle: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.throughput.queueDepth).toBeGreaterThanOrEqual(0);
    expect(res.body.sanitation.state).toBe('pre_rinse');
    expect(Array.isArray(res.body.dairyPipeline)).toBe(true);
  });

  test('returns expanded dairy pipeline inventory', async () => {
    const app = createApp();
    const res = await request(app).get('/api/livestock/inventory');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.inventory)).toBe(true);
    expect(res.body.inventory.some(item => item.product === 'raw_milk')).toBe(true);
    expect(res.body.inventory.some(item => item.product === 'chilled_milk')).toBe(true);
  });
});