#!/usr/bin/env node
// Simple pod simulator for AgroBotGrid
const fs = require('fs');

function simulate(params) {
  const { yield_per_cycle_kg, cycles_per_week, person_hours_per_kg_manual, downtime_fraction, maintenance_person_hours_per_week } = params;

  const kg_per_week = yield_per_cycle_kg * cycles_per_week * (1 - downtime_fraction);
  const manual_person_hours_per_week = kg_per_week * person_hours_per_kg_manual + maintenance_person_hours_per_week;
  const pods_needed = params.target_person_hours ? Math.max(1, Math.ceil(manual_person_hours_per_week / params.target_person_hours)) : null;

  return { kg_per_week, manual_person_hours_per_week, pods_needed };
}

function main() {
  const infile = process.argv[2];
  if (!infile) {
    console.log('Usage: node simulator.js <input.json>');
    process.exit(1);
  }
  const raw = fs.readFileSync(infile,'utf8');
  const params = JSON.parse(raw);
  const out = simulate(params);
  console.log(JSON.stringify(out,null,2));
}

if (require.main === module) main();
