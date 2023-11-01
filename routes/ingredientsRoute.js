const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

router.get('/:recipeId/ingredients', async (req, res) => {
    try {
      const recipeId = req.params.recipeId;
  
      // Fetch the specific recipe by its ID
      const recipe = await Recipe.findById(recipeId);

      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found', recipeId });
      }
  
      // Now you have access to the recipe's ingredients
      const ingredients = recipe.ingredients;

      // Render the 'ingredients/show' template and pass the recipe's ingredients to it
      res.render('ingredients/show', { ingredients });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
module.exports = router;
