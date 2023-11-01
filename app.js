// Import necessary modules and models
const express = require('express');
const mongoose = require('mongoose');
const recipesController = require('./controllers/recipesController');
const ingredientsController = require('./controllers/ingredientsController');
const recipesRouter = require('./routes/recipeRoutes'); // Assuming you have a file named 'recipeRoutes.js'
const ingredientsRouter = require('./routes/ingredientsRoute'); // Assuming you have a file named 'ingredientsRoute.js'

const app = express();

// Middleware and configurations
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/Sopranos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the recipes routes
app.use('/recipes', recipesRouter);

// Define the ingredients routes
app.use('/ingredients', ingredientsRouter);

// Landing page
app.get('/', (req, res) => {
  res.render('landing'); // Replace 'landing' with the name of your landing page template
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
