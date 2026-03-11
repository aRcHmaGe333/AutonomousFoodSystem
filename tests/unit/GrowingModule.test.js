const GrowingModule = require('../../src/backend/models/GrowingModule');

describe('GrowingModule Model', () => {
  let sampleModuleData;

  beforeEach(() => {
    sampleModuleData = {
      name: 'Test-Greenhouse',
      location: { lat: 59.33, lng: 18.07, altitude: 28 },
      moduleType: 'greenhouse',
      dimensions: { length: 10, width: 8, height: 4 },
      capacity: 500,
      status: 'active'
    };
  });

  describe('Constructor', () => {
    test('should create a module with provided data', () => {
      const module = new GrowingModule(sampleModuleData);

      expect(module.name).toBe('Test-Greenhouse');
      expect(module.moduleType).toBe('greenhouse');
      expect(module.capacity).toBe(500);
      expect(module.status).toBe('active');
    });

    test('should generate an ID if not provided', () => {
      const module = new GrowingModule(sampleModuleData);

      expect(module.id).toBeDefined();
      expect(module.id).toMatch(/^module_\d+_[a-z0-9]+$/);
    });

    test('should set sensible defaults', () => {
      const module = new GrowingModule({});

      expect(module.moduleType).toBe('vertical_hydroponic');
      expect(module.status).toBe('initializing');
      expect(module.environmentalSystems.lighting.type).toBe('LED_full_spectrum');
      expect(module.environmentalSystems.irrigation.system).toBe('recirculating_hydroponic');
      expect(module.maxConcurrentCycles).toBe(4);
    });
  });

  describe('Environmental and Sensor Data', () => {
    test('should update environmental settings', () => {
      const module = new GrowingModule(sampleModuleData);

      module.updateEnvironmentalSettings({
        climate: {
          temperature: { target: 24, min: 19, max: 29 }
        }
      });

      expect(module.environmentalSystems.climate.temperature.target).toBe(24);
    });

    test('should update sensor data and timestamp', () => {
      const module = new GrowingModule(sampleModuleData);

      module.updateSensorData('environmental', { temperature: 21, humidity: 61 });

      expect(module.sensorData.environmental.temperature).toBe(21);
      expect(module.sensorData.environmental.humidity).toBe(61);
      expect(module.sensorData.lastUpdated).toBeDefined();
    });

    test('should generate alerts for out-of-range environmental readings', () => {
      const module = new GrowingModule(sampleModuleData);
      const spy = jest.spyOn(module, 'handleAlerts');

      module.updateSensorData('environmental', { temperature: 40 });

      expect(spy).toHaveBeenCalled();
      const alerts = spy.mock.calls[0][0];
      expect(alerts[0].type).toBe('temperature_alert');
    });

    test('should generate alerts for out-of-range pH readings', () => {
      const module = new GrowingModule(sampleModuleData);
      const spy = jest.spyOn(module, 'handleAlerts');

      module.updateSensorData('irrigation', { ph: 7.4 });

      expect(spy).toHaveBeenCalled();
      const alerts = spy.mock.calls[0][0];
      expect(alerts[0].type).toBe('ph_alert');
    });
  });

  describe('Growing Cycle Management', () => {
    test('should start a growing cycle', () => {
      const module = new GrowingModule(sampleModuleData);
      const cycle = module.startGrowingCycle({ cropVariety: 'lettuce', plantCount: 50 });

      expect(cycle.id).toMatch(/^cycle_/);
      expect(cycle.cropVariety).toBe('lettuce');
      expect(cycle.growthStage).toBe('seedling');
      expect(module.activeCycles).toHaveLength(1);
    });

    test('should reject cycles above max concurrency', () => {
      const module = new GrowingModule({ ...sampleModuleData, maxConcurrentCycles: 1 });
      module.startGrowingCycle({ cropVariety: 'lettuce' });

      expect(() => module.startGrowingCycle({ cropVariety: 'tomato' })).toThrow('Maximum concurrent growing cycles reached');
    });

    test('should assign an available section automatically', () => {
      const module = new GrowingModule(sampleModuleData);
      const first = module.startGrowingCycle({ cropVariety: 'lettuce' });
      const second = module.startGrowingCycle({ cropVariety: 'herbs' });

      expect(first.section).toBe('section_1');
      expect(second.section).toBe('section_2');
    });

    test('should harvest a cycle and update metrics', () => {
      const module = new GrowingModule(sampleModuleData);
      const cycle = module.startGrowingCycle({ cropVariety: 'lettuce', plantCount: 50 });

      const harvested = module.harvestCycle(cycle.id, {
        yieldAmount: 40,
        quality: 'excellent',
        notes: 'Strong harvest'
      });

      expect(harvested.harvestData.yieldAmount).toBe(40);
      expect(module.performance.totalYield).toBe(40);
      expect(module.activeCycles).toHaveLength(0);
      expect(module.performance.yieldPerSquareMeter).toBeGreaterThan(0);
    });

    test('should throw when harvesting unknown cycle', () => {
      const module = new GrowingModule(sampleModuleData);

      expect(() => module.harvestCycle('missing_cycle', { yieldAmount: 10 })).toThrow('Growing cycle missing_cycle not found');
    });
  });

  describe('Utilities and Integration', () => {
    test('should assign a robot task', () => {
      const module = new GrowingModule(sampleModuleData);
      const assignment = module.assignRobot('robot_1', 'harvest_section_1');

      expect(assignment.robotId).toBe('robot_1');
      expect(assignment.task).toBe('harvest_section_1');
      expect(module.assignedRobots).toHaveLength(1);
    });

    test('should serialize to JSON', () => {
      const module = new GrowingModule(sampleModuleData);
      const json = module.toJSON();

      expect(json.id).toBe(module.id);
      expect(json.name).toBe('Test-Greenhouse');
      expect(json.environmentalSystems).toBeDefined();
      expect(json.resources).toBeDefined();
    });

    test('should deserialize from JSON', () => {
      const module = new GrowingModule(sampleModuleData);
      const restored = GrowingModule.fromJSON(module.toJSON());

      expect(restored.id).toBe(module.id);
      expect(restored.name).toBe(module.name);
      expect(restored.moduleType).toBe(module.moduleType);
    });

    test('should return summary status', () => {
      const module = new GrowingModule(sampleModuleData);
      const status = module.getStatus();

      expect(status.id).toBe(module.id);
      expect(status.name).toBe(module.name);
      expect(status.status).toBe(module.status);
      expect(status.performance).toBeDefined();
    });
  });
});