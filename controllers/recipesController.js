const Recipe = require('../models/Recipe');

const recipesController = {
  getRecipes: async (req, res) => {
    try {
      const recipes = await Recipe.find();
      res.render('recipes/index', { recipes });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getRecipeById: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id).populate('ingredients');
      res.render('recipes/show', { recipe });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
  showNewRecipeForm: (req, res) => {
    res.render('recipes/new');
  },

  createRecipe: async (req, res) => {
    const { title, description, ingredients, instructions, image, season, episode, author } = req.body;
    try {
      const newRecipe = new Recipe({
        title,
        description,
        ingredients,
        instructions,
        image,
        season,
        episode,
        author,
      });
      await newRecipe.save();
      res.redirect('/recipes');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  showEditRecipeForm: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      res.render('recipes/edit', { recipe });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateRecipe: async (req, res) => {
    const { title, description, ingredients, instructions, image, season, episode } = req.body;
    try {
      await Recipe.findByIdAndUpdate(req.params.id, {
        title,
        description,
        ingredients,
        instructions,
        image,
        season,
        episode,
      });
      res.redirect(`/recipes/${req.params.id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteRecipe: async (req, res) => {
    try {
      await Recipe.findByIdAndRemove(req.params.id);
      res.redirect('/recipes');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = recipesController;
