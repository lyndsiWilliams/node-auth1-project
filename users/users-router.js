// Imports
const router = require('express').Router();
// Import helper functions
const Users = require('./users-model.js');


// CRUD

// Get the list of users
router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;