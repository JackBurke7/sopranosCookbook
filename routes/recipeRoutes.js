// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');

router.get('/', recipesController.getRecipes);
router.get('/:id', recipesController.getRecipeById);
router.get('/new', recipesController.showNewRecipeForm);
router.post('/', recipesController.createRecipe);
router.get('/:id/edit', recipesController.showEditRecipeForm);
router.put('/:id', recipesController.updateRecipe);
router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;
