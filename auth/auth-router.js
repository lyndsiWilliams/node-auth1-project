// Imports
const bcrypt = require('bcrypt');
const router = require('express').Router();
// Import helper functions
const Users = require('../users/users-model.js');


// CRUD

// Registration
router.post('/register', (req, res) => {
  // Get user object
  let user = req.body;
  // Hash the user's password
  const hash = bcrypt.hashSync(user.password, 8);
  // Set password to has value
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Login
router.post('/login', (req, res) => {
  // Grab deconstructed username and password
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      // Compares entered password to stored hashed password
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;