// URC Interpreter skeleton
// Provides validate, plan, and execute (stub) functions for URC documents

const fs = require('fs');

function loadRegistry(registry) {
  // registry can be object or path
  if (!registry) throw new Error('registry required');
  if (typeof registry === 'string') {
    const raw = fs.readFileSync(registry, 'utf8');
    return JSON.parse(raw);
  }
  return registry;
}

function findSensorTypes(reg) {
  const types = new Set();
  if (!reg.capabilities) return types;
  for (const c of reg.capabilities) {
    if (c.category === 'sensor') types.add(c.type);
  }
  return types;
}

function validate(urcDoc, registryInput) {
  const reg = loadRegistry(registryInput);
  const errors = [];

  // basic schema checks
  if (!urcDoc || typeof urcDoc !== 'object') {
    return { ok: false, errors: ['URC document must be an object'] };
  }
  const requiredTop = ['schemaVersion','id','name','servings','ingredients','steps'];
  for (const k of requiredTop) if (!Object.prototype.hasOwnProperty.call(urcDoc, k)) errors.push(`missing top-level field: ${k}`);

  // action availability
  const actionMap = reg.action_map || {};
  const sensorTypes = findSensorTypes(reg);

  if (!urcDoc.steps || !Array.isArray(urcDoc.steps)) errors.push('steps must be an array');
  else {
    for (const step of urcDoc.steps) {
      if (!step.id) errors.push('step missing id');
      if (!step.action) errors.push(`step ${step.id || '<unknown>'} missing action`);
      // action mapping
      const mapped = actionMap[step.action];
      if (!mapped || mapped.length === 0) errors.push(`no capability mapping for action: ${step.action} (step ${step.id})`);
      // required sensors
      if (Array.isArray(step.requiredSensors)) {
        for (const s of step.requiredSensors) {
          // s is a sensor type like 'internal_temperature' — check registry has a matching sensor.type
          // We allow either matching type or capability id
          const hasType = Array.from(sensorTypes).some(t => t === s || t.includes(s));
          const hasId = (reg.capabilities || []).some(c => c.id === s);
          if (!hasType && !hasId) errors.push(`missing required sensor '${s}' for step ${step.id}`);
        }
      }
      // safety check: if step.params include target_temp_c ensure capability max allows it
      if (step.parameters && typeof step.parameters.target_temp_c === 'number') {
        const targets = actionMap[step.action] || [];
        for (const capId of targets) {
          const cap = (reg.capabilities || []).find(c => c.id === capId);
          if (cap && cap.safety_limits && typeof cap.safety_limits.max_temp_c === 'number') {
            if (step.parameters.target_temp_c > cap.safety_limits.max_temp_c) {
              errors.push(`step ${step.id} target_temp_c ${step.parameters.target_temp_c} exceeds capability ${capId} max_temp_c ${cap.safety_limits.max_temp_c}`);
            }
          }
        }
      }
    }
  }

  return { ok: errors.length === 0, errors };
}

function plan(urcDoc, registryInput) {
  const reg = loadRegistry(registryInput);
  const actionMap = reg.action_map || {};
  const plan = [];
  if (!urcDoc.steps) return { plan, warnings: ['no steps'] };

  for (const step of urcDoc.steps) {
    const mapped = actionMap[step.action] || [];
    plan.push({ stepId: step.id, action: step.action, capabilities: mapped, parameters: step.parameters || {} });
  }

  return { plan };
}

async function execute(plan, executor) {
  // executor is an object providing sendCommand(capabilityId, command) and subscribe(sensorId, callback)
  if (!plan || !Array.isArray(plan)) throw new Error('plan must be array');
  const log = [];
  for (const item of plan) {
    // simplistic: call executor for first capability with a generic command
    const caps = item.capabilities || [];
    if (caps.length === 0) {
      log.push({ stepId: item.stepId, status: 'skipped', reason: 'no capabilities' });
      continue;
    }
    const cap = caps[0];
    if (executor && typeof executor.sendCommand === 'function') {
      try {
        const res = await executor.sendCommand(cap, { action: item.action, parameters: item.parameters });
        log.push({ stepId: item.stepId, status: 'ok', capability: cap, result: res });
      } catch (err) {
        log.push({ stepId: item.stepId, status: 'error', capability: cap, error: String(err) });
        break;
      }
    } else {
      // no executor provided — record a dry-run entry
      log.push({ stepId: item.stepId, status: 'dry-run', capability: cap, command: { action: item.action, parameters: item.parameters } });
    }
  }
  return log;
}

module.exports = { validate, plan, execute };
