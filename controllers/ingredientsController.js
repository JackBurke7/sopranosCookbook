const Recipe = require('../models/Recipe');

const ingredientsController = {
  getIngredients: async (req, res) => {
    try {
      const recipes = await Recipe.find();
      const ingredients = recipes.flatMap((recipe) => recipe.ingredients);
      res.render('ingredients/index', { ingredients });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = ingredientsController;
