const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const { validateRecipe, validateRecipeUpdate } = require('../middleware/validation');
const logger = require('../utils/logger');
const RecipeService = require('../services/RecipeService');

// GET /api/recipes - List all recipes with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      cuisine,
      difficulty,
      maxTime,
      search,
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;

    let recipeList = RecipeService.list();

    // Apply filters
    if (category) {
      recipeList = recipeList.filter(recipe => recipe.category === category);
    }
    
    if (cuisine) {
      recipeList = recipeList.filter(recipe => recipe.cuisine === cuisine);
    }
    
    if (difficulty) {
      recipeList = recipeList.filter(recipe => recipe.difficulty === difficulty);
    }
    
    if (maxTime) {
      recipeList = recipeList.filter(recipe => recipe.totalTime <= parseInt(maxTime));
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      recipeList = recipeList.filter(recipe => 
        recipe.name.toLowerCase().includes(searchLower) ||
        recipe.description.toLowerCase().includes(searchLower) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    recipeList.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedRecipes = recipeList.slice(startIndex, endIndex);

    res.json({
      recipes: paginatedRecipes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: recipeList.length,
        pages: Math.ceil(recipeList.length / limit)
      },
      filters: {
        category,
        cuisine,
        difficulty,
        maxTime,
        search
      }
    });

    logger.info(`Retrieved ${paginatedRecipes.length} recipes (page ${page})`);
  } catch (error) {
    logger.error('Error retrieving recipes:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve recipes'
    });
  }
});

// GET /api/recipes/:id - Get specific recipe
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = RecipeService.get(id);

    if (!recipe) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Recipe with id ${id} not found`
      });
    }

    logger.info(`Retrieved recipe: ${recipe.name}`);
    res.json(recipe);
  } catch (error) {
    logger.error('Error retrieving recipe:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve recipe'
    });
  }
});

// POST /api/recipes - Create new recipe
router.post('/', validateRecipe, async (req, res) => {
  try {
    const recipe = RecipeService.create(req.body);

    logger.info(`Created new recipe: ${recipe.name} (${recipe.id})`);
    res.status(201).json(recipe);
  } catch (error) {
    if (error.validation) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Recipe validation failed',
        details: error.validation.errors
      });
    }
    logger.error('Error creating recipe:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create recipe'
    });
  }
});

// PUT /api/recipes/:id - Update recipe
router.put('/:id', validateRecipeUpdate, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecipe = RecipeService.update(id, req.body);

    if (!updatedRecipe) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Recipe with id ${id} not found`
      });
    }

    logger.info(`Updated recipe: ${updatedRecipe.name} (${id})`);
    res.json(updatedRecipe);
  } catch (error) {
    if (error.validation) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Recipe validation failed',
        details: error.validation.errors
      });
    }
    logger.error('Error updating recipe:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update recipe'
    });
  }
});

// DELETE /api/recipes/:id - Delete recipe
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ok = RecipeService.delete(id);

    if (!ok) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Recipe with id ${id} not found`
      });
    }

    logger.info(`Deleted recipe: ${id}`);
    res.status(204).send();
  } catch (error) {
    logger.error('Error deleting recipe:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete recipe'
    });
  }
});

// POST /api/recipes/:id/scale - Scale recipe servings
router.post('/:id/scale', async (req, res) => {
  try {
    const { id } = req.params;
    const { servings } = req.body;

    if (!servings || servings <= 0) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Servings must be a positive number'
      });
    }

    const scaledRecipe = RecipeService.scale(id, servings);
    if (!scaledRecipe) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Recipe with id ${id} not found`
      });
    }

    logger.info(`Scaled recipe ${id} to ${servings} servings`);
    res.json(scaledRecipe);
  } catch (error) {
    logger.error('Error scaling recipe:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to scale recipe'
    });
  }
});

// POST /api/recipes/:id/optimize - Optimize recipe
router.post('/:id/optimize', async (req, res) => {
  try {
    const { id } = req.params;
    const criteria = req.body;

    const optimization = RecipeService.optimize(id, criteria);
    if (!optimization) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Recipe with id ${id} not found`
      });
    }

    const recipe = RecipeService.get(id);
    logger.info(`Optimized recipe: ${recipe.name}`);
    res.json({ recipe, optimization });
  } catch (error) {
    logger.error('Error optimizing recipe:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to optimize recipe'
    });
  }
});

// GET /api/recipes/:id/automation - Get automation assessment
router.get('/:id/automation', async (req, res) => {
  try {
    const { id } = req.params;
    const automation = RecipeService.assessAutomation(id);

    if (!automation) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Recipe with id ${id} not found`
      });
    }

    const recipe = RecipeService.get(id);
    logger.info(`Assessed automation for recipe: ${recipe.name}`);
    res.json(automation);
  } catch (error) {
    logger.error('Error assessing automation:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to assess automation'
    });
  }
});

// Initialize with sample recipes
const initializeSampleRecipes = () => {
  const sampleRecipes = [
    {
      name: "Automated Pasta Carbonara",
      description: "Classic Italian pasta dish optimized for automated preparation",
      category: "pasta",
      cuisine: "italian",
      difficulty: "medium",
      servings: 4,
      prepTime: 10,
      cookTime: 15,
      ingredients: [
        { name: "spaghetti", amount: 400, unit: "g", type: "pasta" },
        { name: "eggs", amount: 4, unit: "large", type: "protein" },
        { name: "parmesan cheese", amount: 100, unit: "g", type: "dairy" },
        { name: "pancetta", amount: 150, unit: "g", type: "meat" },
        { name: "black pepper", amount: 1, unit: "tsp", type: "spice" }
      ],
      instructions: [
        { step: "Boil water for pasta", timing: 5, temperature: 100, action: "boil" },
        { step: "Cook spaghetti until al dente", timing: 8, action: "cook" },
        { step: "Fry pancetta until crispy", timing: 5, temperature: 180, action: "fry" },
        { step: "Mix eggs and cheese", timing: 2, action: "mix" },
        { step: "Combine all ingredients", timing: 2, action: "combine" }
      ],
      equipment: ["large_pot", "frying_pan", "mixing_bowl"],
      tags: ["quick", "italian", "automated", "comfort_food"]
    }
  ];

  RecipeService.initializeSamples(sampleRecipes);
};

// Initialize sample data
initializeSampleRecipes();

module.exports = router;
