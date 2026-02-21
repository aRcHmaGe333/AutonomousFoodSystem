process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'error';
process.env.ENABLE_SAMPLE_DATA = 'false';

const request = require('supertest');
const { createApp } = require('../src/backend/app');

async function run() {
  const app = createApp();

  const health = await request(app).get('/health');
  if (health.statusCode !== 200) throw new Error(`/health failed: ${health.statusCode}`);

  const api = await request(app).get('/api');
  if (api.statusCode !== 200) throw new Error(`/api failed: ${api.statusCode}`);

  const growingModules = await request(app).get('/api/growing/modules');
  // With sample data disabled, this may be an empty list, but it should still respond.
  if (growingModules.statusCode !== 200) throw new Error(`/api/growing/modules failed: ${growingModules.statusCode}`);

  // eslint-disable-next-line no-console
  console.log('Smoke OK:', {
    health: health.body.status,
    endpoints: Object.keys(api.body.endpoints || {}),
    growingModules: Array.isArray(growingModules.body.modules) ? growingModules.body.modules.length : null
  });
}

run().catch(err => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});
