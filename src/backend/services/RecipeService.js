const fs = require('fs');
const path = require('path');
const Recipe = require('../models/Recipe');

const DATA_DIR = path.join(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'recipes.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify({ recipes: [] }, null, 2));
}

function readAll() {
  ensureDataDir();
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  try {
    const parsed = JSON.parse(raw);
    return parsed.recipes || [];
  } catch (err) {
    return [];
  }
}

function writeAll(recipes) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify({ recipes }, null, 2));
}

class RecipeService {
  constructor() {
    this._cache = new Map();
    this._loadToCache();
  }

  _loadToCache() {
    const items = readAll();
    this._cache.clear();
    for (const it of items) {
      // store as Recipe instances
      try {
        const r = new Recipe(it);
        this._cache.set(r.id, r);
      } catch (e) {
        // ignore malformed
      }
    }
  }

  _flush() {
    const arr = Array.from(this._cache.values()).map(r => r.toJSON ? r.toJSON() : r);
    writeAll(arr);
  }

  list() {
    return Array.from(this._cache.values());
  }

  get(id) {
    return this._cache.get(id) || null;
  }

  create(data) {
    const recipe = new Recipe(data);
    // validate
    const validation = recipe.validate();
    if (!validation.isValid) {
      const err = new Error('Validation failed');
      err.validation = validation;
      throw err;
    }
    recipe.assessAutomation();
    this._cache.set(recipe.id, recipe);
    this._flush();
    return recipe;
  }

  update(id, data) {
    const existing = this._cache.get(id);
    if (!existing) return null;
    const updated = new Recipe({ ...existing, ...data, id, updatedAt: new Date() });
    const validation = updated.validate();
    if (!validation.isValid) {
      const err = new Error('Validation failed');
      err.validation = validation;
      throw err;
    }
    updated.assessAutomation();
    this._cache.set(id, updated);
    this._flush();
    return updated;
  }

  delete(id) {
    const exists = this._cache.has(id);
    if (!exists) return false;
    this._cache.delete(id);
    this._flush();
    return true;
  }

  scale(id, servings) {
    const recipe = this._cache.get(id);
    if (!recipe) return null;
    const scaled = new Recipe(recipe);
    scaled.scaleServings(servings);
    // do not overwrite original by default
    return scaled;
  }

  optimize(id, criteria) {
    const recipe = this._cache.get(id);
    if (!recipe) return null;
    const optimization = recipe.optimize(criteria);
    // save mutated recipe
    this._cache.set(id, recipe);
    this._flush();
    return optimization;
  }

  assessAutomation(id) {
    const recipe = this._cache.get(id);
    if (!recipe) return null;
    const automation = recipe.assessAutomation();
    this._cache.set(id, recipe);
    this._flush();
    return automation;
  }

  initializeSamples(sampleArray) {
    for (const data of sampleArray) {
      try {
        const r = new Recipe(data);
        r.assessAutomation();
        this._cache.set(r.id, r);
      } catch (e) {
        // skip malformed
      }
    }
    this._flush();
  }
}

module.exports = new RecipeService();
