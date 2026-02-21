#!/usr/bin/env node
// Simple monetary breakeven calculator
// Usage: node monetary_breakeven.js <costReusable> <costSingleUse> <perUseMaintenance> <lossRate>

const args = process.argv.slice(2).map(Number);
if (args.length < 3) {
  console.log('Usage: node monetary_breakeven.js <costReusable> <costSingleUse> <perUseMaintenance> [lossRate]');
  process.exit(1);
}
const [costReusable, costSingleUse, perUseMaintenance] = args;
const lossRate = args[3] || 0;

if (costSingleUse - perUseMaintenance <= 0) {
  console.log('No monetary breakeven (per-use maintenance >= single-use cost)');
  process.exit(0);
}

let breakeven = costReusable / (costSingleUse - perUseMaintenance);
if (lossRate > 0) breakeven = breakeven / (1 - lossRate);

console.log('Monetary breakeven (uses):', Math.ceil(breakeven));
