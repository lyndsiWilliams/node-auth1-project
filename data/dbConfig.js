// Imports
const knex = require('knex');
const knexfile = require('../knexfile.js');
// Set dynamic environment
const environment = process.env.NODE_ENV || 'development';

module.exports = knex(knexfile[environment]);