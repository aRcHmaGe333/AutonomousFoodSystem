#!/usr/bin/env node
// Simple man-hours savings estimator
// Usage: node manhours_savings.js <households> <adoptionRate> [weeklyShoppingHours] [weeklyCookingHours] [weeklyCleaningHours] [weeklyTransportHours] [residualWeeklyHours]

const args = process.argv.slice(2).map(Number);
if (args.length < 2) {
  console.log('Usage: node manhours_savings.js <households> <adoptionRate(0-1)> [shopH] [cookH] [cleanH] [transportH] [residualH]');
  process.exit(1);
}
const [households, adoptionRate] = args;
const shopH = args[2] ?? 1.5;
const cookH = args[3] ?? 6;
const cleanH = args[4] ?? 2;
const transportH = args[5] ?? 1;
const residualH = args[6] ?? 0.75;

const baselineWeeklyPerPerson = shopH + cookH + cleanH + transportH;
const savingsPerPerson = baselineWeeklyPerPerson - residualH;
const adopters = Math.round(households * adoptionRate);
const totalWeeklySavings = adopters * savingsPerPerson;

console.log('Adopters:', adopters);
console.log('Savings per person (hrs/week):', savingsPerPerson.toFixed(2));
console.log('Total weekly savings (person-hrs):', totalWeeklySavings.toFixed(1));
console.log('Annualized (person-hrs):', (totalWeeklySavings * 52).toFixed(0));
