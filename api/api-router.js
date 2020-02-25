// Imports
const bcrypt = require('bcrypt');
const router = require('express').Router();
// Import routers
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
// Import middleware
const restricted = require('../auth/restricted-middleware.js');
// Set routers
router.use('/auth', authRouter);
router.use('/users', usersRouter);


// CRUD
router.get('/hash', (req, res) => {
  // Get authentication header
  const authentication = req.headers.authentication;
  // Hash auth header value
  const hash = bcrypt.hashSync(authentication, 8); // Number defines how many times value is hashed
  // Respond with hashed value
  res.json({ originalValue: authentication, hash });
});

router.get('/', (req, res) => {
  res.json({ api: "It's alive" });
});

module.exports = router;