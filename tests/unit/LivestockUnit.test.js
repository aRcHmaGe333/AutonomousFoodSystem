const LivestockUnit = require('../../src/backend/models/LivestockUnit');

describe('LivestockUnit Model', () => {
  let sampleUnitData;

  beforeEach(() => {
    sampleUnitData = {
      name: 'Test-Dairy',
      location: { lat: 59.33, lng: 18.07, altitude: 28 },
      unitType: 'dairy',
      capacity: { cattle: 500, current: 200 },
      status: 'active',
      dimensions: { length: 100, width: 60, height: 8 }
    };
  });

  describe('Constructor', () => {
    test('should create a unit with provided data', () => {
      const unit = new LivestockUnit(sampleUnitData);

      expect(unit.name).toBe('Test-Dairy');
      expect(unit.unitType).toBe('dairy');
      expect(unit.capacity.cattle).toBe(500);
      expect(unit.status).toBe('active');
    });

    test('should generate an ID if not provided', () => {
      const unit = new LivestockUnit(sampleUnitData);

      expect(unit.id).toBeDefined();
      expect(unit.id).toMatch(/^livestock_\d+_[a-z0-9]+$/);
    });

    test('should set default values for optional fields', () => {
      const unit = new LivestockUnit({});

      expect(unit.unitType).toBe('dairy');
      expect(unit.status).toBe('initializing');
      expect(unit.corridorConfig.entryWidth).toBe(3.0);
      expect(unit.corridorConfig.exitWidth).toBe(0.8);
      expect(unit.corridorConfig.wallMaterial).toBe('reinforced_polymer');
      expect(unit.milkingSystem.cradleType).toBe('vertical_lift_pneumatic');
      expect(unit.milkingSystem.sensorType).toBe('tof_distance');
      expect(unit.preWashSystem.jetConfig.triggerType).toBe('beam_break_sensor');
    });

    test('should initialize empty animal population', () => {
      const unit = new LivestockUnit(sampleUnitData);

      expect(unit.animalPopulation.total).toBe(0);
      expect(unit.animalPopulation.animals).toEqual([]);
      expect(unit.animalPopulation.healthScore).toBe(100);
    });

    test('should have zone-separated waste management defaults', () => {
      const unit = new LivestockUnit(sampleUnitData);

      expect(unit.wasteManagement.scraper.material).toBe('stainless_316');
      expect(unit.wasteManagement.digester.type).toBe('anaerobic_mesophilic');
      expect(unit.wasteManagement.digester.digestateUse).toBe('fertilizer_for_growing_modules');
      expect(unit.wasteManagement.waterRecycling.recycleRatePercent).toBe(85);
    });
  });

  describe('Corridor Configuration', () => {
    test('should have passive geometry defaults', () => {
      const unit = new LivestockUnit(sampleUnitData);

      expect(unit.corridorConfig.entryWidth).toBeGreaterThan(unit.corridorConfig.exitWidth);
      expect(unit.corridorConfig.length).toBe(12.0);
      expect(unit.corridorConfig.wallCompliance).toBe(0.15);
      expect(unit.corridorConfig.hoofWells.count).toBe(4);
      expect(unit.corridorConfig.lighting.type).toBe('diffused_ambient');
    });
  });

  describe('Milking System', () => {
    test('should have passive-cradle defaults', () => {
      const unit = new LivestockUnit(sampleUnitData);

      expect(unit.milkingSystem.cradleType).toBe('vertical_lift_pneumatic');
      expect(unit.milkingSystem.alignmentToleranceMm).toBe(50);
      expect(unit.milkingSystem.cycleParams.vacuumPressureKpa.default).toBe(37);
      expect(unit.milkingSystem.cycleParams.pulsationRate.default).toBe(55);
      expect(unit.milkingSystem.status).toBe('idle');
    });

    test('should start a milking cycle', () => {
      const unit = new LivestockUnit(sampleUnitData);
      const cycle = unit.startMilkingCycle();

      expect(cycle.id).toMatch(/^milking_/);
      expect(cycle.status).toBe('in_progress');
      expect(unit.milkingSystem.status).toBe('active');
    });

    test('should reject starting a cycle when system is not idle', () => {
      const unit = new LivestockUnit(sampleUnitData);
      unit.startMilkingCycle();

      expect(() => unit.startMilkingCycle()).toThrow('Milking system is currently active');
    });

    test('should complete a milking cycle and update metrics', () => {
      const unit = new LivestockUnit(sampleUnitData);
      unit.animalPopulation.total = 100;
      unit.startMilkingCycle();

      unit.completeMilkingCycle({
        yieldLiters: 2500,
        animalsProcessed: 100,
        milkQuality: { fatPercent: 3.8, proteinPercent: 3.3, somaticCellCount: 150000 }
      });

      expect(unit.milkingSystem.dailySessions).toBe(1);
      expect(unit.milkingSystem.totalYieldLiters).toBe(2500);
      expect(unit.performance.totalMilkYieldLiters).toBe(2500);
      expect(unit.performance.averageDailyYieldPerCow).toBe(25);
      expect(unit.performance.milkQuality.fatPercent).toBe(3.8);
    });
  });

  describe('Animal Management', () => {
    test('should register an animal', () => {
      const unit = new LivestockUnit(sampleUnitData);
      const animal = unit.registerAnimal({
        breed: 'holstein',
        weight: 600,
        lactationNumber: 3
      });

      expect(animal.id).toBeDefined();
      expect(animal.breed).toBe('holstein');
      expect(animal.weight).toBe(600);
      expect(unit.animalPopulation.total).toBe(1);
      expect(unit.animalPopulation.breeds.holstein).toBe(1);
    });

    test('should register multiple animals and track breeds', () => {
      const unit = new LivestockUnit(sampleUnitData);
      unit.registerAnimal({ breed: 'holstein' });
      unit.registerAnimal({ breed: 'holstein' });
      unit.registerAnimal({ breed: 'jersey' });

      expect(unit.animalPopulation.total).toBe(3);
      expect(unit.animalPopulation.breeds.holstein).toBe(2);
      expect(unit.animalPopulation.breeds.jersey).toBe(1);
    });

    test('should update animal health status', () => {
      const unit = new LivestockUnit(sampleUnitData);
      const animal = unit.registerAnimal({ breed: 'holstein' });

      unit.updateAnimalHealth(animal.id, {
        status: 'monitoring',
        notes: 'Slight limp observed'
      });

      const updated = unit.animalPopulation.animals.find(a => a.id === animal.id);
      expect(updated.healthStatus).toBe('monitoring');
      expect(updated.healthHistory).toHaveLength(1);
      expect(unit.animalPopulation.healthScore).toBe(0); // 0 of 1 healthy
    });

    test('should throw when updating health for unknown animal', () => {
      const unit = new LivestockUnit(sampleUnitData);
      expect(() => unit.updateAnimalHealth('nonexistent', { status: 'healthy' }))
        .toThrow('Animal nonexistent not found');
    });

    test('should get animal health data', () => {
      const unit = new LivestockUnit(sampleUnitData);
      const animal = unit.registerAnimal({ breed: 'jersey', weight: 450, lactationNumber: 2 });

      const health = unit.getAnimalHealth(animal.id);
      expect(health.breed).toBe('jersey');
      expect(health.healthStatus).toBe('healthy');
      expect(health.lactationNumber).toBe(2);
    });
  });

  describe('Sensor Data', () => {
    test('should update sensor data', () => {
      const unit = new LivestockUnit(sampleUnitData);
      unit.updateSensorData('environmental', { temperature: 20, humidity: 65 });

      expect(unit.sensorData.environmental.temperature).toBe(20);
      expect(unit.sensorData.environmental.humidity).toBe(65);
      expect(unit.sensorData.lastUpdated).toBeDefined();
    });

    test('should generate alerts for out-of-range temperature', () => {
      const unit = new LivestockUnit(sampleUnitData);
      const spy = jest.spyOn(unit, 'handleAlerts');

      unit.updateSensorData('environmental', { temperature: 30 });

      expect(spy).toHaveBeenCalled();
      const alerts = spy.mock.calls[0][0];
      expect(alerts[0].type).toBe('temperature_alert');
    });

    test('should generate stress alerts for elevated cortisol', () => {
      const unit = new LivestockUnit(sampleUnitData);
      const spy = jest.spyOn(unit, 'handleAlerts');

      unit.updateSensorData('animalHealth', { cortisolLevel: 25 });

      expect(spy).toHaveBeenCalled();
      const alerts = spy.mock.calls[0][0];
      expect(alerts[0].type).toBe('stress_alert');
    });
  });

  describe('Iterative Fix Log', () => {
    test('should log a physical DevOps fix', () => {
      const unit = new LivestockUnit(sampleUnitData);
      const fix = unit.logIterativeFix({
        component: 'pre_wash_jet_3',
        failureDescription: 'Nozzle clogged with mineral deposits',
        resolution: 'Replaced nozzle; added descaling flush every 48h',
        automatedNow: true,
        codeReference: 'preWashSystem.maintenance.descale()',
        appliedToNetwork: true
      });

      expect(fix.id).toMatch(/^fix_/);
      expect(fix.automatedNow).toBe(true);
      expect(unit.maintenance.iterativeFixLog).toHaveLength(1);
      expect(unit.performance.interventionCount).toBe(1);
    });
  });

  describe('Integration Points', () => {
    test('should track growing system integration for digestate', () => {
      const unit = new LivestockUnit(sampleUnitData);
      expect(unit.integrations.growingSystem).toBeDefined();
      expect(unit.wasteManagement.digester.digestateUse).toBe('fertilizer_for_growing_modules');
    });

    test('should track cooking system integration', () => {
      const unit = new LivestockUnit(sampleUnitData);
      expect(unit.integrations.cookingSystem).toBeDefined();
    });

    test('should track distribution system integration', () => {
      const unit = new LivestockUnit(sampleUnitData);
      expect(unit.integrations.distributionSystem).toBeDefined();
    });
  });

  describe('Serialization', () => {
    test('should serialize to JSON', () => {
      const unit = new LivestockUnit(sampleUnitData);
      const json = unit.toJSON();

      expect(json.id).toBe(unit.id);
      expect(json.name).toBe('Test-Dairy');
      expect(json.corridorConfig).toBeDefined();
      expect(json.milkingSystem).toBeDefined();
      expect(json.preWashSystem).toBeDefined();
      expect(json.wasteManagement).toBeDefined();
    });

    test('should deserialize from JSON', () => {
      const unit = new LivestockUnit(sampleUnitData);
      const json = unit.toJSON();
      const restored = LivestockUnit.fromJSON(json);

      expect(restored.id).toBe(unit.id);
      expect(restored.name).toBe(unit.name);
      expect(restored.unitType).toBe(unit.unitType);
    });

    test('should return summary status', () => {
      const unit = new LivestockUnit(sampleUnitData);
      const status = unit.getStatus();

      expect(status.id).toBe(unit.id);
      expect(status.name).toBe('Test-Dairy');
      expect(status.unitType).toBe('dairy');
      expect(status.animalCount).toBe(0);
      expect(status.milkingStatus).toBe('idle');
      expect(status.performance).toBeDefined();
    });
  });
});
