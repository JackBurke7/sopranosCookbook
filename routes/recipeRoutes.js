const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');

router.get('/', recipesController.getRecipes);
router.get('/:id', recipesController.getRecipeById);
router.get('/new', recipesController.showNewRecipeForm);
router.post('/', recipesController.createRecipe);
router.get('/:id/edit', async (req, res) => {
    try {
      const recipeId = req.params.id;
      const recipe = await Recipe.findById(recipeId);
      res.render('editRecipe', { recipe }); 
    } catch (error) {
      res.status(500).json({ error: 'Error loading the edit form' });
    }
  });
  router.post('/:id/edit', async (req, res) => {
    try {
      const recipeId = req.params.id;
      const { title, description, season, episode, instructions, image } = req.body;

      await Recipe.findByIdAndUpdate(recipeId, {
        title,
        description,
        season,
        episode,
        instructions,
        image,
      });
  
      res.redirect(`/recipes/${recipeId}`); 
    } catch (error) {
      res.status(500).json({ error: 'Error updating the recipe' });
    }
  });  
router.put('/:id', recipesController.updateRecipe);
router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;
