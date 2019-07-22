const env = 'development'
const config = require('../knexfile')[env]

const knex = require('knex')(config)

const Signal = require('./signal')(knex)

module.exports = { knex, Signal }
