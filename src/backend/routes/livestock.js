const express = require('express');
const router = express.Router();
const LivestockUnit = require('../models/LivestockUnit');
const LivestockService = require('../services/LivestockService');
const logger = require('../utils/logger');

// In-memory storage (will be replaced with database)
const livestockUnits = new Map();

// Initialize service
const livestockService = new LivestockService();

/**
 * Initialize sample livestock units
 */
const initializeSampleUnits = () => {
  const sampleUnits = [
    {
      name: 'Dairy-Alpha',
      location: { lat: 59.3293, lng: 18.0686, altitude: 28 },
      unitType: 'dairy',
      capacity: { cattle: 500, current: 320 },
      status: 'active',
      dimensions: { length: 120, width: 80, height: 8 }
    },
    {
      name: 'Dairy-Beta',
      location: { lat: 59.3350, lng: 18.0750, altitude: 22 },
      unitType: 'dairy',
      capacity: { cattle: 300, current: 180 },
      status: 'active',
      dimensions: { length: 80, width: 60, height: 8 }
    },
    {
      name: 'Mixed-Gamma',
      location: { lat: 59.3200, lng: 18.0500, altitude: 15 },
      unitType: 'mixed',
      capacity: { cattle: 200, current: 0 },
      status: 'initializing',
      dimensions: { length: 100, width: 70, height: 10 }
    }
  ];

  sampleUnits.forEach(unitData => {
    const unit = new LivestockUnit(unitData);

    // Add sample animals to active units
    if (unit.status === 'active') {
      const count = unitData.capacity.current;
      for (let i = 0; i < Math.min(count, 5); i++) {
        try {
          unit.registerAnimal({
            breed: i % 2 === 0 ? 'holstein' : 'jersey',
            weight: 550 + Math.random() * 150,
            lactationNumber: Math.floor(Math.random() * 5) + 1,
            birthDate: new Date(Date.now() - (24 + Math.random() * 60) * 30 * 24 * 60 * 60 * 1000)
          });
        } catch (error) {
          logger.error(`Error registering sample animal in ${unit.name}:`, error);
        }
      }
      // Set total to match capacity.current (sample animals are representative)
      unit.animalPopulation.total = count;
    }

    livestockUnits.set(unit.id, unit);
    logger.info(`Initialized livestock unit: ${unit.name} (${unit.id})`);
  });
};

// --- Unit CRUD ---

// GET /api/livestock/units - List all livestock units
router.get('/units', (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      unitType,
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;

    let unitList = Array.from(livestockUnits.values());

    if (status) {
      unitList = unitList.filter(unit => unit.status === status);
    }
    if (unitType) {
      unitList = unitList.filter(unit => unit.unitType === unitType);
    }

    unitList.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      if (typeof aVal === 'string') { aVal = aVal.toLowerCase(); bVal = bVal.toLowerCase(); }
      return sortOrder === 'desc' ? (bVal > aVal ? 1 : -1) : (aVal > bVal ? 1 : -1);
    });

    const startIndex = (page - 1) * limit;
    const paginated = unitList.slice(startIndex, startIndex + parseInt(limit));

    res.json({
      units: paginated.map(unit => unit.getStatus()),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: unitList.length,
        pages: Math.ceil(unitList.length / limit)
      }
    });
    logger.info(`Retrieved ${paginated.length} livestock units`);
  } catch (error) {
    logger.error('Error retrieving livestock units:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to retrieve livestock units' });
  }
});

// GET /api/livestock/units/:id - Get specific unit
router.get('/units/:id', (req, res) => {
  try {
    const unit = livestockUnits.get(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: 'Not Found', message: `Livestock unit ${req.params.id} not found` });
    }
    res.json(unit.toJSON());
  } catch (error) {
    logger.error('Error retrieving livestock unit:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to retrieve livestock unit' });
  }
});

// POST /api/livestock/units - Create new unit
router.post('/units', (req, res) => {
  try {
    const unit = new LivestockUnit(req.body);
    livestockUnits.set(unit.id, unit);
    logger.info(`Created livestock unit: ${unit.name} (${unit.id})`);
    res.status(201).json(unit.toJSON());
  } catch (error) {
    logger.error('Error creating livestock unit:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to create livestock unit' });
  }
});

// PUT /api/livestock/units/:id - Update unit
router.put('/units/:id', (req, res) => {
  try {
    const unit = livestockUnits.get(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: 'Not Found', message: `Livestock unit ${req.params.id} not found` });
    }

    Object.keys(req.body).forEach(key => {
      if (key !== 'id' && unit.hasOwnProperty(key)) {
        unit[key] = req.body[key];
      }
    });
    unit.updatedAt = new Date();
    livestockUnits.set(req.params.id, unit);

    logger.info(`Updated livestock unit: ${unit.name} (${req.params.id})`);
    res.json(unit.toJSON());
  } catch (error) {
    logger.error('Error updating livestock unit:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to update livestock unit' });
  }
});

// --- Milking Operations ---

// GET /api/livestock/units/:id/milking/status - Milking system status
router.get('/units/:id/milking/status', (req, res) => {
  try {
    const unit = livestockUnits.get(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: 'Not Found', message: `Livestock unit ${req.params.id} not found` });
    }

    res.json({
      unitId: unit.id,
      milkingSystem: unit.milkingSystem,
      preWashSystem: unit.preWashSystem,
      corridorConfig: unit.corridorConfig,
      lastUpdated: unit.updatedAt
    });
  } catch (error) {
    logger.error('Error retrieving milking status:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to retrieve milking status' });
  }
});

// POST /api/livestock/units/:id/milking/cycle - Start milking cycle
router.post('/units/:id/milking/cycle', (req, res) => {
  try {
    const unit = livestockUnits.get(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: 'Not Found', message: `Livestock unit ${req.params.id} not found` });
    }

    const cycle = unit.startMilkingCycle(req.body);
    livestockUnits.set(req.params.id, unit);

    logger.info(`Started milking cycle ${cycle.id} in ${unit.name}`);
    res.status(201).json(cycle);
  } catch (error) {
    logger.error('Error starting milking cycle:', error);
    res.status(400).json({ error: 'Bad Request', message: error.message });
  }
});

// POST /api/livestock/units/:id/milking/complete - Complete milking cycle
router.post('/units/:id/milking/complete', (req, res) => {
  try {
    const unit = livestockUnits.get(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: 'Not Found', message: `Livestock unit ${req.params.id} not found` });
    }

    const result = unit.completeMilkingCycle(req.body);
    livestockService.recordMilkingSession(unit.id, req.body);
    livestockUnits.set(req.params.id, unit);

    logger.info(`Completed milking cycle in ${unit.name}: ${req.body.yieldLiters}L`);
    res.json(result);
  } catch (error) {
    logger.error('Error completing milking cycle:', error);
    res.status(400).json({ error: 'Bad Request', message: error.message });
  }
});

// GET /api/livestock/units/:id/milking/history - Milking yield history
router.get('/units/:id/milking/history', (req, res) => {
  try {
    const unit = livestockUnits.get(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: 'Not Found', message: `Livestock unit ${req.params.id} not found` });
    }

    const days = parseInt(req.query.days) || 30;
    const history = livestockService.getMilkingHistory(unit.id, days);

    res.json({
      unitId: unit.id,
      period: `${days} days`,
      sessions: history,
      totalYieldLiters: history.reduce((sum, s) => sum + (s.yieldLiters || 0), 0)
    });
  } catch (error) {
    logger.error('Error retrieving milking history:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to retrieve milking history' });
  }
});

// POST /api/livestock/units/:id/milking/optimize - Get optimization recommendations
router.post('/units/:id/milking/optimize', (req, res) => {
  try {
    const unit = livestockUnits.get(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: 'Not Found', message: `Livestock unit ${req.params.id} not found` });
    }

    const optimization = livestockService.optimizeMilkingCycle(unit);
    logger.info(`Generated milking optimization for ${unit.name}`);
    res.json(optimization);
  } catch (error) {
    logger.error('Error generating milking optimization:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to generate optimization' });
  }
});

// --- Animal Management ---

// GET /api/livestock/units/:id/animals - List animals
router.get('/units/:id/animals', (req, res) => {
  try {
    const unit = livestockUnits.get(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: 'Not Found', message: `Livestock unit ${req.params.id} not found` });
    }

    const { breed, healthStatus, page = 1, limit = 50 } = req.query;
    let animals = [...unit.animalPopulation.animals];

    if (breed) animals = animals.filter(a => a.breed === breed);
    if (healthStatus) animals = animals.filter(a => a.healthStatus === healthStatus);

    const startIndex = (page - 1) * limit;
    const paginated = animals.slice(startIndex, startIndex + parseInt(limit));

    res.json({
      animals: paginated,
      population: {
        total: unit.animalPopulation.total,
        breeds: unit.animalPopulation.breeds,
        healthScore: unit.animalPopulation.healthScore
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: animals.length,
        pages: Math.ceil(animals.length / limit)
      }
    });
  } catch (error) {
    logger.error('Error retrieving animals:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to retrieve animals' });
  }
});

// POST /api/livestock/units/:id/animals - Register animal
router.post('/units/:id/animals', (req, res) => {
  try {
    const unit = livestockUnits.get(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: 'Not Found', message: `Livestock unit ${req.params.id} not found` });
    }

    const animal = unit.registerAnimal(req.body);
    livestockUnits.set(req.params.id, unit);

    logger.info(`Registered animal ${animal.id} in ${unit.name}`);
    res.status(201).json(animal);
  } catch (error) {
    logger.error('Error registering animal:', error);
    res.status(400).json({ error: 'Bad Request', message: error.message });
  }
});

// GET /api/livestock/units/:id/animals/:animalId/health - Animal health data
router.get('/units/:id/animals/:animalId/health', (req, res) => {
  try {
    const unit = livestockUnits.get(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: 'Not Found', message: `Livestock unit ${req.params.id} not found` });
    }

    const health = unit.getAnimalHealth(req.params.animalId);
    res.json(health);
  } catch (error) {
    logger.error('Error retrieving animal health:', error);
    res.status(404).json({ error: 'Not Found', message: error.message });
  }
});

// POST /api/livestock/units/:id/animals/:animalId/health - Update health record
router.post('/units/:id/animals/:animalId/health', (req, res) => {
  try {
    const unit = livestockUnits.get(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: 'Not Found', message: `Livestock unit ${req.params.id} not found` });
    }

    const animal = unit.updateAnimalHealth(req.params.animalId, req.body);
    livestockUnits.set(req.params.id, unit);

    logger.info(`Updated health for animal ${req.params.animalId} in ${unit.name}`);
    res.json(animal);
  } catch (error) {
    logger.error('Error updating animal health:', error);
    res.status(400).json({ error: 'Bad Request', message: error.message });
  }
});

// --- Environment & Sensors ---

// GET /api/livestock/units/:id/environment - Environmental readings
router.get('/units/:id/environment', (req, res) => {
  try {
    const unit = livestockUnits.get(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: 'Not Found', message: `Livestock unit ${req.params.id} not found` });
    }

    res.json({
      unitId: unit.id,
      environmentalSystems: unit.environmentalSystems,
      sensorData: unit.sensorData,
      lastUpdated: unit.sensorData.lastUpdated
    });
  } catch (error) {
    logger.error('Error retrieving environment data:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to retrieve environment data' });
  }
});

// POST /api/livestock/units/:id/environment - Update environmental settings
router.post('/units/:id/environment', (req, res) => {
  try {
    const unit = livestockUnits.get(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: 'Not Found', message: `Livestock unit ${req.params.id} not found` });
    }

    unit.updateEnvironmentalSettings(req.body);
    livestockUnits.set(req.params.id, unit);

    logger.info(`Updated environmental settings for ${unit.name}`);
    res.json({ message: 'Environmental settings updated', settings: unit.environmentalSystems });
  } catch (error) {
    logger.error('Error updating environment:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to update environment' });
  }
});

// POST /api/livestock/units/:id/sensors - Push sensor data
router.post('/units/:id/sensors', (req, res) => {
  try {
    const { sensorType, readings } = req.body;
    const unit = livestockUnits.get(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: 'Not Found', message: `Livestock unit ${req.params.id} not found` });
    }

    unit.updateSensorData(sensorType, readings);
    livestockUnits.set(req.params.id, unit);

    res.json({ message: 'Sensor data updated', sensorType, readings, timestamp: new Date() });
  } catch (error) {
    logger.error('Error updating sensor data:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to update sensor data' });
  }
});

// --- Waste & Resources ---

// GET /api/livestock/units/:id/waste - Waste management status
router.get('/units/:id/waste', (req, res) => {
  try {
    const unit = livestockUnits.get(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: 'Not Found', message: `Livestock unit ${req.params.id} not found` });
    }

    res.json({ unitId: unit.id, wasteManagement: unit.getWasteStatus() });
  } catch (error) {
    logger.error('Error retrieving waste status:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to retrieve waste status' });
  }
});

// GET /api/livestock/units/:id/resources - Resource consumption
router.get('/units/:id/resources', (req, res) => {
  try {
    const unit = livestockUnits.get(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: 'Not Found', message: `Livestock unit ${req.params.id} not found` });
    }

    const efficiency = livestockService.calculateResourceEfficiency(unit);
    res.json({ unitId: unit.id, resources: unit.resources, efficiency });
  } catch (error) {
    logger.error('Error retrieving resources:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to retrieve resources' });
  }
});

// --- Iterative Fix Log (Physical DevOps) ---

// POST /api/livestock/units/:id/fixes - Log an iterative fix
router.post('/units/:id/fixes', (req, res) => {
  try {
    const unit = livestockUnits.get(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: 'Not Found', message: `Livestock unit ${req.params.id} not found` });
    }

    const fix = unit.logIterativeFix(req.body);
    livestockUnits.set(req.params.id, unit);

    logger.info(`Logged iterative fix ${fix.id} for ${unit.name}`);
    res.status(201).json(fix);
  } catch (error) {
    logger.error('Error logging fix:', error);
    res.status(400).json({ error: 'Bad Request', message: error.message });
  }
});

// GET /api/livestock/units/:id/fixes - Get fix history
router.get('/units/:id/fixes', (req, res) => {
  try {
    const unit = livestockUnits.get(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: 'Not Found', message: `Livestock unit ${req.params.id} not found` });
    }

    res.json({
      unitId: unit.id,
      fixes: unit.maintenance.iterativeFixLog,
      totalInterventions: unit.performance.interventionCount,
      automatedFixes: unit.maintenance.iterativeFixLog.filter(f => f.automatedNow).length
    });
  } catch (error) {
    logger.error('Error retrieving fixes:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to retrieve fixes' });
  }
});

// --- Dashboard & Analytics ---

// GET /api/livestock/dashboard - Network-wide dashboard
router.get('/dashboard', (req, res) => {
  try {
    const units = Array.from(livestockUnits.values());

    const dashboard = {
      summary: livestockService.estimateNetworkThroughput(units),
      unitStatus: units.map(unit => unit.getStatus()),
      networkHealth: {
        averageHealthScore: units.length > 0
          ? Math.round(units.reduce((sum, u) => sum + u.animalPopulation.healthScore, 0) / units.length)
          : 0,
        unitsInMaintenance: units.filter(u => u.status === 'maintenance').length,
        totalIterativeFixes: units.reduce((sum, u) => sum + u.maintenance.iterativeFixLog.length, 0)
      },
      generatedAt: new Date()
    };

    res.json(dashboard);
    logger.info('Generated livestock network dashboard');
  } catch (error) {
    logger.error('Error generating dashboard:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to generate dashboard' });
  }
});

// GET /api/livestock/inventory - Available dairy/meat for cooking system
router.get('/inventory', (req, res) => {
  try {
    const inventory = [];

    livestockUnits.forEach(unit => {
      if (unit.status === 'active' && unit.unitType !== 'beef') {
        const dailyMilk = unit.performance.averageDailyYieldPerCow * unit.animalPopulation.total;
        if (dailyMilk > 0) {
          inventory.push({
            unitId: unit.id,
            unitName: unit.name,
            product: 'raw_milk',
            estimatedDailyLiters: dailyMilk,
            quality: unit.performance.milkQuality,
            availableNow: unit.milkingSystem.status === 'idle'
          });
        }
      }
    });

    res.json({
      inventory,
      totalItems: inventory.length,
      generatedAt: new Date()
    });
    logger.info(`Generated livestock inventory with ${inventory.length} products`);
  } catch (error) {
    logger.error('Error generating inventory:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to generate inventory' });
  }
});

// GET /api/livestock/units/:id/health-report - Full herd health report
router.get('/units/:id/health-report', (req, res) => {
  try {
    const unit = livestockUnits.get(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: 'Not Found', message: `Livestock unit ${req.params.id} not found` });
    }

    const report = livestockService.generateHealthReport(unit);
    logger.info(`Generated health report for ${unit.name}`);
    res.json(report);
  } catch (error) {
    logger.error('Error generating health report:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to generate health report' });
  }
});

// Initialize sample data
initializeSampleUnits();

module.exports = router;
