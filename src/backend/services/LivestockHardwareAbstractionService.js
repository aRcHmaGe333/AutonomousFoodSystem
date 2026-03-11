/**
 * Livestock Hardware Abstraction Service
 * Defines subsystem contracts and a simulation-first operational model for dairy units.
 */

class LivestockHardwareAbstractionService {
  constructor(options = {}) {
    this.simulationMode = options.simulationMode ?? process.env.ENABLE_LIVESTOCK_SIMULATION !== 'false';
    this.simulationState = new Map();
    this.sanitationSequence = [
      'idle',
      'pre_rinse',
      'alkaline_wash',
      'acid_rinse',
      'disinfect',
      'verification'
    ];
  }

  getHardwareAbstraction(unit) {
    return {
      unitId: unit.id,
      unitType: unit.unitType,
      mode: this.simulationMode ? 'simulation_first' : 'hardware_pending',
      subsystems: {
        corridor: {
          role: 'animal indexing, queue shaping, and calm entry flow',
          status: 'simulated',
          sensors: ['entry_beam', 'queue_depth_camera', 'hoof_well_pressure', 'exit_beam'],
          actuators: ['entry_gate', 'lane_diverter', 'cradle_lift_trigger'],
          controls: ['queue_target', 'lane_release_interval_sec', 'stall_assignment_policy']
        },
        cradle: {
          role: 'passive alignment and milking readiness positioning',
          status: 'simulated',
          sensors: ['tof_alignment', 'lift_height_encoder', 'vacuum_feedback'],
          actuators: ['pneumatic_lift', 'vacuum_regulator', 'pulsation_controller'],
          controls: ['lift_profile', 'vacuum_pressure_kpa', 'pulsation_rate_cpm']
        },
        preWash: {
          role: 'pre-entry cleaning and stimulation',
          status: 'simulated',
          sensors: ['beam_break', 'water_temperature', 'spray_pressure'],
          actuators: ['mist_jets', 'circulation_pump', 'dosing_valve'],
          controls: ['spray_duration_sec', 'water_temp_c', 'sanitize_dose_ml']
        },
        sanitation: {
          role: 'post-cycle wash and verification state machine',
          status: 'simulated',
          sensors: ['conductivity_probe', 'return_flow_meter', 'surface_cleanliness_camera'],
          actuators: ['rinse_pump', 'detergent_injector', 'disinfectant_injector'],
          controls: ['wash_recipe', 'cycle_state', 'verification_threshold']
        },
        waste: {
          role: 'scrape, digest, and fertilizer-loop output',
          status: 'simulated',
          sensors: ['scraper_load', 'digester_temperature', 'slurry_volume'],
          actuators: ['scraper_drive', 'slurry_pump', 'digester_heater'],
          controls: ['scrape_interval_min', 'digester_temp_c', 'digestate_dispatch_target']
        },
        biosecurity: {
          role: 'entry hygiene, quarantine, and cross-zone isolation',
          status: 'simulated',
          sensors: ['bootbath_level', 'quarantine_occupancy', 'door_interlock'],
          actuators: ['access_lock', 'bootbath_refill', 'quarantine_gate'],
          controls: ['zone_access_policy', 'quarantine_threshold', 'entry_sanitize_cycle']
        }
      },
      updatedAt: new Date()
    };
  }

  getSimulationStatus(unit) {
    const state = this.ensureSimulationState(unit);
    state.throughput = this.calculateThroughput(unit, state);
    state.resourceLoop = this.calculateResourceLoop(unit, state);
    state.dairyPipeline = this.getDairyPipeline(unit);
    state.updatedAt = new Date();

    return {
      unitId: unit.id,
      mode: this.simulationMode ? 'simulated' : 'hardware_pending',
      throughput: state.throughput,
      sanitation: state.sanitation,
      biosecurity: state.biosecurity,
      resourceLoop: state.resourceLoop,
      dairyPipeline: state.dairyPipeline,
      updatedAt: state.updatedAt
    };
  }

  advanceSimulation(unit, input = {}) {
    const state = this.ensureSimulationState(unit);
    const currentThroughput = this.calculateThroughput(unit, state);
    const arrivals = Number.isFinite(input.arrivals) ? input.arrivals : Math.max(1, Math.round(unit.animalPopulation.total * 0.01));
    const completions = Number.isFinite(input.completions)
      ? input.completions
      : Math.min(state.corridor.queueDepth + arrivals, Math.max(1, Math.round(currentThroughput.hourlyCapacity / 2)));

    state.corridor.queueDepth = Math.max(0, state.corridor.queueDepth + arrivals - completions);
    state.corridor.animalsProcessedToday += completions;
    state.corridor.lastArrivals = arrivals;
    state.corridor.lastCompletions = completions;

    if (input.sanitationState && this.sanitationSequence.includes(input.sanitationState)) {
      state.sanitation.state = input.sanitationState;
    } else if (input.advanceSanitationCycle || state.sanitation.state !== 'idle') {
      state.sanitation.state = this.getNextSanitationState(state.sanitation.state);
    }

    state.sanitation.cyclesCompleted += input.advanceSanitationCycle ? 1 : 0;
    state.sanitation.lastTransitionAt = new Date();

    if (input.quarantineDelta) {
      state.biosecurity.quarantineOccupancy = Math.max(0, state.biosecurity.quarantineOccupancy + input.quarantineDelta);
    }

    state.biosecurity.entrySanitationPassRate = this.clamp(
      Number.isFinite(input.entrySanitationPassRate) ? input.entrySanitationPassRate : state.biosecurity.entrySanitationPassRate,
      0,
      1
    );

    state.resourceLoop = this.calculateResourceLoop(unit, state);
    state.throughput = this.calculateThroughput(unit, state);
    state.dairyPipeline = this.getDairyPipeline(unit);
    state.updatedAt = new Date();

    return this.getSimulationStatus(unit);
  }

  getResourceLoopStatus(unit) {
    const state = this.ensureSimulationState(unit);
    state.resourceLoop = this.calculateResourceLoop(unit, state);

    return {
      unitId: unit.id,
      digestateUse: unit.wasteManagement.digester.digestateUse,
      growingSystemConnection: unit.integrations.growingSystem,
      resourceLoop: state.resourceLoop,
      updatedAt: new Date()
    };
  }

  getDairyPipeline(unit) {
    const estimatedDailyLiters = Math.round(unit.performance.averageDailyYieldPerCow * unit.animalPopulation.total);
    const rawMilkLiters = unit.dairyPipeline.rawMilk.currentLiters || estimatedDailyLiters;

    return [
      {
        product: 'raw_milk',
        stage: 'collection',
        status: unit.dairyPipeline.rawMilk.status,
        availableLiters: rawMilkLiters,
        note: 'Directly recorded from completed milking cycles.'
      },
      {
        product: 'chilled_milk',
        stage: 'buffered_cooling',
        status: unit.dairyPipeline.chilledMilk.status,
        availableLiters: Math.round(rawMilkLiters * unit.dairyPipeline.chilledMilk.estimatedRecoveryRate),
        note: 'Simulated post-collection cooling buffer.'
      },
      {
        product: 'cream_stream',
        stage: 'separation_placeholder',
        status: unit.dairyPipeline.creamStream.status,
        availableLiters: 0,
        note: 'Conceptual separator output placeholder.'
      },
      {
        product: 'skim_milk_stream',
        stage: 'separation_placeholder',
        status: unit.dairyPipeline.skimMilkStream.status,
        availableLiters: 0,
        note: 'Conceptual companion stream after cream separation.'
      },
      {
        product: 'cultured_base',
        stage: 'fermentation_placeholder',
        status: unit.dairyPipeline.culturedBase.status,
        availableLiters: 0,
        note: 'Conceptual downstream base for yogurt, kefir, or similar products.'
      }
    ];
  }

  ensureSimulationState(unit) {
    if (!this.simulationState.has(unit.id)) {
      this.simulationState.set(unit.id, this.createDefaultState(unit));
    }

    return this.simulationState.get(unit.id);
  }

  createDefaultState(unit) {
    return {
      corridor: {
        queueDepth: Math.min(Math.max(2, Math.round(unit.animalPopulation.total * 0.04)), unit.milkingSystem.stations * 3),
        animalsProcessedToday: 0,
        lastArrivals: 0,
        lastCompletions: 0
      },
      sanitation: {
        state: 'idle',
        cyclesCompleted: 0,
        waterReusePercent: unit.preWashSystem.waterLoop.recycleRatePercent,
        lastTransitionAt: new Date()
      },
      biosecurity: {
        quarantineOccupancy: 0,
        entrySanitationPassRate: 0.98,
        zoneIntegrity: 'stable'
      },
      throughput: null,
      resourceLoop: null,
      dairyPipeline: null,
      updatedAt: new Date()
    };
  }

  calculateThroughput(unit, state) {
    const washPenalty = state.sanitation.state === 'idle' ? 0 : 0.75;
    const queuePenalty = state.corridor.queueDepth > unit.milkingSystem.stations * 2 ? 0.9 : 1;
    const averageCycleMinutes = Number((7.5 + washPenalty).toFixed(2));
    const hourlyCapacity = Number((unit.milkingSystem.stations * (60 / averageCycleMinutes) * 0.82 * queuePenalty).toFixed(2));
    const utilizationPercent = Math.min(100, Math.round((state.corridor.queueDepth / Math.max(unit.milkingSystem.stations, 1)) * 18));

    let bottleneck = 'cradle_capacity';
    if (state.sanitation.state !== 'idle') {
      bottleneck = 'sanitation_turnover';
    } else if (state.corridor.queueDepth > unit.milkingSystem.stations * 2) {
      bottleneck = 'corridor_queue';
    }

    return {
      queueDepth: state.corridor.queueDepth,
      averageCycleMinutes,
      hourlyCapacity,
      utilizationPercent,
      estimatedQueueClearHours: Number((state.corridor.queueDepth / Math.max(hourlyCapacity, 1)).toFixed(2)),
      bottleneck,
      animalsProcessedToday: state.corridor.animalsProcessedToday
    };
  }

  calculateResourceLoop(unit, state) {
    const animalCount = unit.animalPopulation.total;
    const manureInputKgDay = Math.round(animalCount * 55);
    const digestateLitersDay = Math.round(manureInputKgDay * 0.82);
    const methaneOutputM3Day = Math.round(manureInputKgDay * 0.03);
    const fertilizerEquivalentLitersDay = Math.round(digestateLitersDay * 0.65);
    const syncStatus = unit.integrations.growingSystem.connected ? 'simulated_sync_ready' : 'not_connected';

    return {
      manureInputKgDay,
      digestateLitersDay,
      methaneOutputM3Day,
      fertilizerEquivalentLitersDay,
      dispatchTarget: 'growing_module_feed_blend',
      syncStatus,
      sanitationConstraint: state.sanitation.state === 'verification' ? 'holding_dispatch' : 'clear_to_dispatch'
    };
  }

  getNextSanitationState(currentState) {
    const currentIndex = this.sanitationSequence.indexOf(currentState);
    if (currentIndex === -1 || currentIndex === this.sanitationSequence.length - 1) {
      return this.sanitationSequence[0];
    }

    return this.sanitationSequence[currentIndex + 1];
  }

  clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }
}

module.exports = LivestockHardwareAbstractionService;