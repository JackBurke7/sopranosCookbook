const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  ingredients: [
    {
      name: String,
      quantity: String,
    },
  ],
  instructions: [String],
  season: Number,
  episode: Number,
  author: String,
});

module.exports = mongoose.model('Recipe', recipeSchema);
