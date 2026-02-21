/**
 * Livestock Unit Model - Core data structure for industrial-scale livestock production
 * Implements passive-cradle milking, zone-separated architecture, and iterative automation
 */

class LivestockUnit {
  constructor(data = {}) {
    this.id = data.id || this.generateId();
    this.name = data.name || `Livestock-${this.id.slice(-8)}`;
    this.location = data.location || { lat: 0, lng: 0, altitude: 0 };
    this.unitType = data.unitType || 'dairy'; // dairy, beef, poultry, mixed
    this.capacity = data.capacity || { cattle: 500, current: 0 };
    this.status = data.status || 'initializing'; // initializing, active, maintenance, offline
    this.dimensions = data.dimensions || { length: 100, width: 60, height: 8 }; // meters

    // Narrowing corridor configuration (passive geometry replaces robotic arms)
    this.corridorConfig = data.corridorConfig || {
      entryWidth: 3.0,       // meters — wide enough for calm entry
      exitWidth: 0.8,        // meters — narrows to index the animal
      length: 12.0,          // meters — gradual taper, non-threatening
      wallMaterial: 'reinforced_polymer', // soft, visually ambiguous
      wallCompliance: 0.15,  // meters of "give" under load
      hoofWells: {
        count: 4,
        material: 'comfort_slat_mat',
        depthMm: 25,         // gentle braking texture
        spacingMm: 600       // standard bovine stance width
      },
      lighting: {
        type: 'diffused_ambient',
        intensityLux: 200,   // low, non-threatening
        colorTempK: 4000     // neutral white
      }
    };

    // Passive-cradle milking system
    this.milkingSystem = data.milkingSystem || {
      stations: 8,
      cradleType: 'vertical_lift_pneumatic',
      sensorType: 'tof_distance',           // Time-of-Flight — same tech as smartphones
      alignmentToleranceMm: 50,             // 2-4 inch window after hoof indexing
      cycleParams: {
        vacuumPressureKpa: { min: 32, max: 42, default: 37 },
        pulsationRate: { min: 40, max: 65, default: 55 },   // cycles per minute
        pulsationRatio: '60:40',
        maxDurationMin: 12
      },
      hygiene: {
        preDipType: 'iodine_spray',
        postDipType: 'barrier_sealant',
        autoFlushIntervalMin: 30
      },
      status: 'idle',         // idle, active, cleaning, maintenance
      dailySessions: 0,
      totalYieldLiters: 0
    };

    // Pre-wash decontamination corridor
    this.preWashSystem = data.preWashSystem || {
      poolDepthMm: 80,
      poolLength: 4.0,       // meters
      jetConfig: {
        type: 'low_pressure_mist',
        temperatureC: 32,     // warm — triggers oxytocin
        pressureBar: 1.5,
        triggerType: 'beam_break_sensor'  // "If Cow, then Spray"
      },
      waterLoop: {
        filtrationStages: 3,
        recycleRatePercent: 85,
        qualityMonitoring: true
      }
    };

    // Environmental systems (biological zone)
    this.environmentalSystems = data.environmentalSystems || {
      climate: {
        temperature: { target: 18, min: 10, max: 25 },  // Celsius
        humidity: { target: 65, min: 50, max: 80 },
        ventilation: { rateM3PerHour: 5000, type: 'forced_cross_flow' }
      },
      bedding: {
        type: 'automated_deep_litter',
        replacementIntervalDays: 14,
        comfortFeatures: ['grooming_brushes', 'soft_mats']
      },
      feedDelivery: {
        type: 'autonomous_mixer_shuttle',
        rationPrecision: 'per_animal_rfid',
        deliveriesPerDay: 4
      }
    };

    // Animal population tracking
    this.animalPopulation = data.animalPopulation || {
      total: 0,
      breeds: {},                     // { 'holstein': 200, 'jersey': 50 }
      averageAge: 0,                  // months
      healthScore: 100,               // 0-100
      mortalityRate: 0,               // percentage
      averageLactations: 0,
      animals: []                     // individual animal records
    };

    // Sensor data (latest readings)
    this.sensorData = data.sensorData || {
      environmental: {},
      animalHealth: {},
      milkingPerformance: {},
      systemStatus: {},
      lastUpdated: null
    };

    // Resource management
    this.resources = data.resources || {
      feed: {
        silage: { current: 0, unit: 'tonnes', dailyConsumption: 0 },
        concentrate: { current: 0, unit: 'tonnes', dailyConsumption: 0 },
        hay: { current: 0, unit: 'tonnes', dailyConsumption: 0 }
      },
      water: { capacityLiters: 50000, currentLiters: 40000, dailyConsumption: 0 },
      energy: {
        consumptionKw: 0,
        dailyUsageKwh: 0,
        solarOffsetPercent: 0
      }
    };

    // Performance metrics
    this.performance = data.performance || {
      totalMilkYieldLiters: 0,
      averageDailyYieldPerCow: 0,    // liters
      milkQuality: {
        fatPercent: 0,
        proteinPercent: 0,
        somaticCellCount: 0
      },
      uptime: 100,                    // percentage
      mtbf: 0,                        // mean time between failures (hours)
      mtbhi: 0,                       // mean time between human interventions (hours)
      interventionCount: 0,
      cycleSuccessRate: 100
    };

    // Waste management — closed-loop
    this.wasteManagement = data.wasteManagement || {
      scraper: {
        type: 'vacuum_automated',
        intervalMin: 60,
        material: 'stainless_316'
      },
      digester: {
        type: 'anaerobic_mesophilic',
        capacityM3: 500,
        temperatureC: 37,
        methaneOutputM3Day: 0,
        digestateUse: 'fertilizer_for_growing_modules'  // integration point
      },
      waterRecycling: {
        filtrationStages: 3,
        recycleRatePercent: 85,
        qualityMonitoring: true
      }
    };

    // Maintenance and lifecycle
    this.maintenance = data.maintenance || {
      lastMaintenance: null,
      nextScheduledMaintenance: null,
      maintenanceHistory: [],
      iterativeFixLog: [],            // the "physical DevOps" log
      componentLifespans: {
        corridorWalls: { installed: new Date(), expectedLifeMonths: 12 },
        milkingCradles: { installed: new Date(), expectedLifeMonths: 18 },
        scrapers: { installed: new Date(), expectedLifeHours: 8760 },
        sensors: { installed: new Date(), expectedLifeHours: 17520 },
        preWashJets: { installed: new Date(), expectedLifeMonths: 6 }
      }
    };

    // Integration interfaces
    this.integrations = data.integrations || {
      growingSystem: { connected: false, lastSync: null },   // digestate → fertilizer
      cookingSystem: { connected: false, lastSync: null },   // dairy → recipes
      distributionSystem: { connected: false, lastSync: null }, // cold-chain
      networkNodes: []                                        // other livestock units
    };

    // Metadata
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.version = data.version || '1.0.0';
  }

  generateId() {
    return 'livestock_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // --- Environmental Control ---

  updateEnvironmentalSettings(settings) {
    this.environmentalSystems = { ...this.environmentalSystems, ...settings };
    this.updatedAt = new Date();
    this.logEvent('environmental_update', { changes: settings });
  }

  // --- Sensor Data ---

  updateSensorData(sensorType, readings) {
    if (!this.sensorData[sensorType]) {
      this.sensorData[sensorType] = {};
    }
    this.sensorData[sensorType] = { ...this.sensorData[sensorType], ...readings };
    this.sensorData.lastUpdated = new Date();
    this.checkAlerts(sensorType, readings);
  }

  checkAlerts(sensorType, readings) {
    const alerts = [];

    if (sensorType === 'environmental') {
      const climate = this.environmentalSystems.climate;
      if (readings.temperature !== undefined) {
        if (readings.temperature < climate.temperature.min || readings.temperature > climate.temperature.max) {
          alerts.push({
            type: 'temperature_alert',
            severity: readings.temperature > climate.temperature.max + 5 ? 'critical' : 'high',
            message: `Temperature ${readings.temperature}°C outside optimal range`,
            timestamp: new Date()
          });
        }
      }
      if (readings.humidity !== undefined) {
        if (readings.humidity < climate.humidity.min || readings.humidity > climate.humidity.max) {
          alerts.push({
            type: 'humidity_alert',
            severity: 'medium',
            message: `Humidity ${readings.humidity}% outside optimal range`,
            timestamp: new Date()
          });
        }
      }
    }

    if (sensorType === 'animalHealth') {
      if (readings.cortisolLevel !== undefined && readings.cortisolLevel > 20) {
        alerts.push({
          type: 'stress_alert',
          severity: 'high',
          message: `Elevated cortisol detected: ${readings.cortisolLevel} ng/mL`,
          timestamp: new Date()
        });
      }
    }

    if (alerts.length > 0) {
      this.handleAlerts(alerts);
    }
  }

  handleAlerts(alerts) {
    alerts.forEach(alert => {
      this.logEvent('alert', alert);
    });
  }

  // --- Milking Operations ---

  startMilkingCycle(params = {}) {
    if (this.milkingSystem.status !== 'idle') {
      throw new Error(`Milking system is currently ${this.milkingSystem.status}`);
    }

    this.milkingSystem.status = 'active';
    const cycle = {
      id: this.generateCycleId(),
      startedAt: new Date(),
      stations: params.stations || this.milkingSystem.stations,
      cycleParams: {
        ...this.milkingSystem.cycleParams,
        ...params.cycleParams
      },
      animalsProcessed: 0,
      yieldLiters: 0,
      status: 'in_progress'
    };

    this.logEvent('milking_cycle_started', { cycleId: cycle.id });
    return cycle;
  }

  completeMilkingCycle(cycleData) {
    this.milkingSystem.status = 'cleaning';
    this.milkingSystem.dailySessions += 1;
    this.milkingSystem.totalYieldLiters += cycleData.yieldLiters || 0;

    this.performance.totalMilkYieldLiters += cycleData.yieldLiters || 0;
    if (this.animalPopulation.total > 0) {
      this.performance.averageDailyYieldPerCow =
        this.performance.totalMilkYieldLiters / this.animalPopulation.total;
    }

    if (cycleData.milkQuality) {
      this.performance.milkQuality = { ...this.performance.milkQuality, ...cycleData.milkQuality };
    }

    this.logEvent('milking_cycle_completed', {
      yieldLiters: cycleData.yieldLiters,
      animalsProcessed: cycleData.animalsProcessed
    });

    // Notify cooking system
    this.notifyCookingSystem(cycleData);

    // Auto-transition to idle after cleaning
    setTimeout(() => {
      this.milkingSystem.status = 'idle';
    }, 0);

    this.updatedAt = new Date();
    return cycleData;
  }

  notifyCookingSystem(cycleData) {
    if (this.integrations.cookingSystem.connected) {
      this.logEvent('cooking_system_notification', {
        ingredient: 'raw_milk',
        amountLiters: cycleData.yieldLiters,
        quality: this.performance.milkQuality,
        timestamp: new Date()
      });
    }
  }

  // --- Animal Management ---

  registerAnimal(animalData) {
    const animal = {
      id: animalData.id || 'animal_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      rfidTag: animalData.rfidTag || null,
      breed: animalData.breed || 'holstein',
      birthDate: animalData.birthDate || null,
      weight: animalData.weight || 0,
      lactationNumber: animalData.lactationNumber || 0,
      healthStatus: 'healthy',
      healthHistory: [],
      milkingHistory: [],
      registeredAt: new Date()
    };

    this.animalPopulation.animals.push(animal);
    this.animalPopulation.total = this.animalPopulation.animals.length;

    // Update breed distribution
    if (!this.animalPopulation.breeds[animal.breed]) {
      this.animalPopulation.breeds[animal.breed] = 0;
    }
    this.animalPopulation.breeds[animal.breed] += 1;

    this.logEvent('animal_registered', { animalId: animal.id, breed: animal.breed });
    this.updatedAt = new Date();
    return animal;
  }

  updateAnimalHealth(animalId, healthData) {
    const animal = this.animalPopulation.animals.find(a => a.id === animalId);
    if (!animal) {
      throw new Error(`Animal ${animalId} not found`);
    }

    animal.healthStatus = healthData.status || animal.healthStatus;
    animal.healthHistory.push({
      date: new Date(),
      ...healthData
    });

    // Recalculate population health score
    const healthyCount = this.animalPopulation.animals.filter(a => a.healthStatus === 'healthy').length;
    this.animalPopulation.healthScore = Math.round((healthyCount / this.animalPopulation.total) * 100);

    this.logEvent('animal_health_updated', { animalId, ...healthData });
    this.updatedAt = new Date();
    return animal;
  }

  getAnimalHealth(animalId) {
    const animal = this.animalPopulation.animals.find(a => a.id === animalId);
    if (!animal) {
      throw new Error(`Animal ${animalId} not found`);
    }
    return {
      id: animal.id,
      breed: animal.breed,
      healthStatus: animal.healthStatus,
      healthHistory: animal.healthHistory,
      lactationNumber: animal.lactationNumber,
      weight: animal.weight
    };
  }

  // --- Iterative Fix Log (Physical DevOps) ---

  logIterativeFix(fixData) {
    const fix = {
      id: 'fix_' + Date.now(),
      timestamp: new Date(),
      component: fixData.component,
      failureDescription: fixData.failureDescription,
      resolution: fixData.resolution,
      automatedNow: fixData.automatedNow || false, // was this converted to code?
      codeReference: fixData.codeReference || null,
      appliedToNetwork: fixData.appliedToNetwork || false
    };

    this.maintenance.iterativeFixLog.push(fix);
    this.performance.interventionCount += 1;
    this.logEvent('iterative_fix', fix);
    this.updatedAt = new Date();
    return fix;
  }

  // --- Waste Management ---

  getWasteStatus() {
    return {
      scraper: this.wasteManagement.scraper,
      digester: {
        ...this.wasteManagement.digester,
        digestateAvailableForGrowing: this.integrations.growingSystem.connected
      },
      waterRecycling: this.wasteManagement.waterRecycling
    };
  }

  // --- Utility Methods ---

  generateCycleId() {
    return 'milking_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
  }

  logEvent(eventType, data) {
    console.log(`[${this.id}] ${eventType}:`, data);
  }

  getStatus() {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      unitType: this.unitType,
      animalCount: this.animalPopulation.total,
      healthScore: this.animalPopulation.healthScore,
      milkingStatus: this.milkingSystem.status,
      performance: this.performance,
      lastUpdated: this.updatedAt
    };
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      unitType: this.unitType,
      capacity: this.capacity,
      status: this.status,
      dimensions: this.dimensions,
      corridorConfig: this.corridorConfig,
      milkingSystem: this.milkingSystem,
      preWashSystem: this.preWashSystem,
      environmentalSystems: this.environmentalSystems,
      animalPopulation: this.animalPopulation,
      sensorData: this.sensorData,
      resources: this.resources,
      performance: this.performance,
      wasteManagement: this.wasteManagement,
      maintenance: this.maintenance,
      integrations: this.integrations,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      version: this.version
    };
  }

  static fromJSON(data) {
    return new LivestockUnit(data);
  }
}

module.exports = LivestockUnit;
