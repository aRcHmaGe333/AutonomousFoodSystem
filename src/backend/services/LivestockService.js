/**
 * Livestock Service - Production optimization and analytics for livestock units
 * Handles milking cycle optimization, herd health analytics, and resource efficiency
 */

class LivestockService {
  constructor() {
    this.milkingHistory = new Map();    // unitId -> milking session records
    this.healthAnalytics = new Map();   // unitId -> health trend data
    this.benchmarks = {
      dailyYieldPerCow: {               // liters/day by breed
        holstein: 32,
        jersey: 22,
        guernsey: 20,
        brown_swiss: 25
      },
      milkQuality: {                     // target percentages by breed
        holstein: { fat: 3.6, protein: 3.2 },
        jersey: { fat: 5.0, protein: 3.8 },
        guernsey: { fat: 4.5, protein: 3.4 },
        brown_swiss: { fat: 4.0, protein: 3.5 }
      },
      feedConversion: {                  // kg feed per liter milk
        holstein: 0.7,
        jersey: 0.6,
        default: 0.7
      },
      optimalMilkingFrequency: 3,       // times per day
      optimalCycleParams: {
        vacuumPressureKpa: 37,
        pulsationRate: 55,
        pulsationRatio: '60:40'
      }
    };
  }

  /**
   * Analyze milking performance and recommend cycle parameter adjustments
   */
  optimizeMilkingCycle(unit) {
    const population = unit.animalPopulation;
    const currentParams = unit.milkingSystem.cycleParams;
    const recommendations = [];

    // Check yield against breed benchmarks
    if (population.total > 0) {
      const dominantBreed = this.getDominantBreed(population.breeds);
      const expectedYield = this.benchmarks.dailyYieldPerCow[dominantBreed] || 25;
      const actualYield = unit.performance.averageDailyYieldPerCow;

      if (actualYield > 0 && actualYield < expectedYield * 0.85) {
        // Yield is below 85% of benchmark — suggest adjustments
        if (currentParams.vacuumPressureKpa.default < 40) {
          recommendations.push({
            parameter: 'vacuumPressureKpa',
            current: currentParams.vacuumPressureKpa.default,
            suggested: Math.min(currentParams.vacuumPressureKpa.default + 2, 42),
            reason: 'Yield below breed benchmark; slight pressure increase may improve extraction'
          });
        }
        if (currentParams.pulsationRate.default < 60) {
          recommendations.push({
            parameter: 'pulsationRate',
            current: currentParams.pulsationRate.default,
            suggested: currentParams.pulsationRate.default + 5,
            reason: 'Increased pulsation rate can reduce residual milk'
          });
        }
      }
    }

    // Check milk quality
    const quality = unit.performance.milkQuality;
    if (quality.somaticCellCount > 200000) {
      recommendations.push({
        parameter: 'hygiene',
        current: unit.milkingSystem.hygiene,
        suggested: { ...unit.milkingSystem.hygiene, autoFlushIntervalMin: 15 },
        reason: `Somatic cell count ${quality.somaticCellCount} indicates potential mastitis; increase flush frequency`
      });
    }

    return {
      unitId: unit.id,
      timestamp: new Date(),
      currentPerformance: {
        dailyYieldPerCow: unit.performance.averageDailyYieldPerCow,
        milkQuality: quality,
        cycleSuccessRate: unit.performance.cycleSuccessRate
      },
      recommendations,
      confidence: recommendations.length > 0 ? 0.7 : 0.9
    };
  }

  /**
   * Generate herd health report
   */
  generateHealthReport(unit) {
    const animals = unit.animalPopulation.animals;
    const healthBreakdown = {
      healthy: 0,
      monitoring: 0,
      treatment: 0,
      quarantine: 0
    };

    animals.forEach(animal => {
      const status = animal.healthStatus || 'healthy';
      if (healthBreakdown[status] !== undefined) {
        healthBreakdown[status] += 1;
      }
    });

    // Calculate age distribution
    const ageDistribution = this.calculateAgeDistribution(animals);

    // Calculate lactation statistics
    const lactationStats = this.calculateLactationStats(animals);

    return {
      unitId: unit.id,
      timestamp: new Date(),
      totalAnimals: unit.animalPopulation.total,
      healthScore: unit.animalPopulation.healthScore,
      healthBreakdown,
      ageDistribution,
      lactationStats,
      mortalityRate: unit.animalPopulation.mortalityRate,
      alerts: this.generateHealthAlerts(unit)
    };
  }

  calculateAgeDistribution(animals) {
    const distribution = { young: 0, prime: 0, mature: 0 };
    const now = new Date();

    animals.forEach(animal => {
      if (!animal.birthDate) return;
      const ageMonths = (now - new Date(animal.birthDate)) / (1000 * 60 * 60 * 24 * 30);
      if (ageMonths < 24) distribution.young += 1;
      else if (ageMonths < 72) distribution.prime += 1;
      else distribution.mature += 1;
    });

    return distribution;
  }

  calculateLactationStats(animals) {
    const lactations = animals
      .filter(a => a.lactationNumber > 0)
      .map(a => a.lactationNumber);

    if (lactations.length === 0) return { average: 0, max: 0, count: 0 };

    return {
      average: lactations.reduce((sum, l) => sum + l, 0) / lactations.length,
      max: Math.max(...lactations),
      count: lactations.length
    };
  }

  generateHealthAlerts(unit) {
    const alerts = [];

    if (unit.animalPopulation.healthScore < 90) {
      alerts.push({
        type: 'herd_health_declining',
        severity: unit.animalPopulation.healthScore < 70 ? 'critical' : 'warning',
        message: `Herd health score at ${unit.animalPopulation.healthScore}%`
      });
    }

    if (unit.animalPopulation.mortalityRate > 2) {
      alerts.push({
        type: 'elevated_mortality',
        severity: 'critical',
        message: `Mortality rate ${unit.animalPopulation.mortalityRate}% exceeds threshold`
      });
    }

    return alerts;
  }

  /**
   * Calculate resource efficiency metrics
   */
  calculateResourceEfficiency(unit) {
    const resources = unit.resources;
    const performance = unit.performance;
    const population = unit.animalPopulation.total;

    if (population === 0) {
      return { feedEfficiency: 0, waterEfficiency: 0, energyPerLiter: 0 };
    }

    const totalDailyFeed =
      (resources.feed.silage.dailyConsumption || 0) +
      (resources.feed.concentrate.dailyConsumption || 0) +
      (resources.feed.hay.dailyConsumption || 0);

    const dailyMilk = performance.averageDailyYieldPerCow * population;

    return {
      feedEfficiency: dailyMilk > 0 ? (totalDailyFeed / dailyMilk).toFixed(3) : 0,
      waterEfficiency: dailyMilk > 0 ? (resources.water.dailyConsumption / dailyMilk).toFixed(2) : 0,
      energyPerLiter: dailyMilk > 0 ? (resources.energy.dailyUsageKwh / dailyMilk).toFixed(3) : 0,
      feedPerAnimalKg: population > 0 ? (totalDailyFeed / population).toFixed(2) : 0,
      waterPerAnimalLiters: population > 0 ? (resources.water.dailyConsumption / population).toFixed(1) : 0
    };
  }

  /**
   * Estimate network throughput at scale
   */
  estimateNetworkThroughput(units) {
    const totals = {
      totalUnits: units.length,
      activeUnits: 0,
      totalAnimals: 0,
      totalDailyMilkLiters: 0,
      totalDailyFeedTonnes: 0,
      averageHealthScore: 0,
      humanInterventionsPerDay: 0,
      animalsPerHuman: 0
    };

    units.forEach(unit => {
      if (unit.status === 'active') {
        totals.activeUnits += 1;
        totals.totalAnimals += unit.animalPopulation.total;
        totals.totalDailyMilkLiters +=
          unit.performance.averageDailyYieldPerCow * unit.animalPopulation.total;
        totals.averageHealthScore += unit.animalPopulation.healthScore;

        const dailyInterventions = unit.performance.mtbhi > 0
          ? 24 / unit.performance.mtbhi
          : 0;
        totals.humanInterventionsPerDay += dailyInterventions;

        totals.totalDailyFeedTonnes +=
          (unit.resources.feed.silage.dailyConsumption || 0) +
          (unit.resources.feed.concentrate.dailyConsumption || 0) +
          (unit.resources.feed.hay.dailyConsumption || 0);
      }
    });

    if (totals.activeUnits > 0) {
      totals.averageHealthScore = Math.round(totals.averageHealthScore / totals.activeUnits);
    }
    if (totals.humanInterventionsPerDay > 0) {
      totals.animalsPerHuman = Math.round(totals.totalAnimals / totals.humanInterventionsPerDay);
    }

    return totals;
  }

  getDominantBreed(breeds) {
    let maxCount = 0;
    let dominant = 'holstein';
    for (const [breed, count] of Object.entries(breeds)) {
      if (count > maxCount) {
        maxCount = count;
        dominant = breed;
      }
    }
    return dominant;
  }

  /**
   * Record a milking session for historical analysis
   */
  recordMilkingSession(unitId, sessionData) {
    if (!this.milkingHistory.has(unitId)) {
      this.milkingHistory.set(unitId, []);
    }

    const record = {
      timestamp: new Date(),
      yieldLiters: sessionData.yieldLiters,
      animalsProcessed: sessionData.animalsProcessed,
      duration: sessionData.duration,
      quality: sessionData.quality || {}
    };

    this.milkingHistory.get(unitId).push(record);

    // Keep last 1000 records per unit
    const history = this.milkingHistory.get(unitId);
    if (history.length > 1000) {
      this.milkingHistory.set(unitId, history.slice(-1000));
    }

    return record;
  }

  /**
   * Get milking history for a unit
   */
  getMilkingHistory(unitId, days = 30) {
    const history = this.milkingHistory.get(unitId) || [];
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return history.filter(record => new Date(record.timestamp) >= cutoff);
  }
}

module.exports = LivestockService;
