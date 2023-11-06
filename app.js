const express = require('express');
const mongoose = require('mongoose');
const recipesRouter = require('./routes/recipeRoutes'); 
const ingredientsRouter = require('./routes/ingredientsRoute'); 
const authRoutes = require('./routes/authRoutes');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');


require('dotenv').config();


passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET, 
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, cb) => {
    console.log('Google Strategy callback executed');
    console.log('Profile:', profile);
  }
));

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static(__dirname + '/public'));



mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



app.use('/recipes', recipesRouter);

app.use('/ingredients', ingredientsRouter);
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.render('landing'); 
});
app.get('/signup', (req, res) => {
  res.render('signup'); 
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
