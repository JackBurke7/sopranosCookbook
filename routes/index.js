const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('landing'); 
});
// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));

module.exports = router;
