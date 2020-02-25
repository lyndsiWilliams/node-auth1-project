// Imports
const bcrypt = require('bcrypt');
// Import helper functions
const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  // Grab deconstructed username and password
  let { username, password } = req.headers;

  // Check if username/password exists before getting to business
  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        // Compares entered password to stored hashed password
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      })
      .catch(({ name, message, stack }) => {
        // Deconstructed error
        res.status(500).json({ name, message, stack });
      });
  } else {
    res.status(400).json({ error: 'Please provide credentials' });
  }
};