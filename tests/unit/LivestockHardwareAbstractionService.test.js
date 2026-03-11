const LivestockUnit = require('../../src/backend/models/LivestockUnit');
const LivestockHardwareAbstractionService = require('../../src/backend/services/LivestockHardwareAbstractionService');

describe('LivestockHardwareAbstractionService', () => {
  let service;
  let unit;

  beforeEach(() => {
    service = new LivestockHardwareAbstractionService();
    unit = new LivestockUnit({
      name: 'Sim-Dairy',
      status: 'active',
      unitType: 'dairy'
    });
    unit.animalPopulation.total = 120;
    unit.performance.averageDailyYieldPerCow = 28;
    unit.integrations.growingSystem.connected = true;
  });

  test('returns explicit hardware abstraction by subsystem', () => {
    const abstraction = service.getHardwareAbstraction(unit);

    expect(abstraction.mode).toBe('simulation_first');
    expect(abstraction.subsystems.corridor.sensors).toContain('entry_beam');
    expect(abstraction.subsystems.sanitation.controls).toContain('cycle_state');
    expect(abstraction.subsystems.waste.status).toBe('simulated');
  });

  test('builds a composite simulation status', () => {
    const status = service.getSimulationStatus(unit);

    expect(status.throughput.hourlyCapacity).toBeGreaterThan(0);
    expect(status.resourceLoop.syncStatus).toBe('simulated_sync_ready');
    expect(Array.isArray(status.dairyPipeline)).toBe(true);
    expect(status.dairyPipeline[0].product).toBe('raw_milk');
  });

  test('advances queueing and sanitation state', () => {
    const initial = service.getSimulationStatus(unit);
    const next = service.advanceSimulation(unit, {
      arrivals: 10,
      completions: 4,
      advanceSanitationCycle: true,
      quarantineDelta: 1
    });

    expect(next.throughput.queueDepth).toBe(initial.throughput.queueDepth + 6);
    expect(next.sanitation.state).toBe('pre_rinse');
    expect(next.biosecurity.quarantineOccupancy).toBe(1);
  });

  test('exposes resource loop metrics for growing integration', () => {
    const resourceLoop = service.getResourceLoopStatus(unit);

    expect(resourceLoop.resourceLoop.manureInputKgDay).toBeGreaterThan(0);
    expect(resourceLoop.resourceLoop.fertilizerEquivalentLitersDay).toBeGreaterThan(0);
    expect(resourceLoop.growingSystemConnection.connected).toBe(true);
  });

  test('expands dairy pipeline beyond raw milk with status labels', () => {
    unit.completeMilkingCycle({ yieldLiters: 1800, animalsProcessed: 90 });
    const pipeline = service.getDairyPipeline(unit);

    expect(pipeline.map(stage => stage.product)).toEqual([
      'raw_milk',
      'chilled_milk',
      'cream_stream',
      'skim_milk_stream',
      'cultured_base'
    ]);
    expect(pipeline.find(stage => stage.product === 'raw_milk').status).toBe('implemented');
    expect(pipeline.find(stage => stage.product === 'cream_stream').status).toBe('conceptual');
  });
});