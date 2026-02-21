const path = require('path');
const { validate, plan, execute } = require('../../src/backend/services/urcInterpreter');
const registryPath = path.join(__dirname, '../../docs/capability_registry.json');
const urcExample = require('../../docs/urc_example_recipe.json');

test('validate example URC against registry', () => {
  const regPath = registryPath;
  const res = validate(urcExample, regPath);
  expect(res).toBeDefined();
  expect(res.ok).toBe(true);
});

test('plan produces mapping for steps', () => {
  const res = plan(urcExample, registryPath);
  expect(res).toBeDefined();
  expect(Array.isArray(res.plan)).toBe(true);
  expect(res.plan.length).toBe(urcExample.steps.length);
  // each plan item should reference capabilities
  for (const item of res.plan) {
    expect(item).toHaveProperty('capabilities');
    expect(Array.isArray(item.capabilities)).toBe(true);
  }
});

test('execute dry-run logs commands when no executor', async () => {
  const p = plan(urcExample, registryPath).plan;
  const log = await execute(p);
  expect(Array.isArray(log)).toBe(true);
  expect(log.length).toBe(p.length);
  // ensure dry-run status appears
  expect(log.some(l => l.status === 'dry-run')).toBe(true);
});
