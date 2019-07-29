require('dotenv').config()

const env = process.env.NODE_ENV

const config = require('../knexfile')[env]

const knex = require('knex')(config)

const Signal = require('./signal')(knex)

module.exports = { knex, Signal }
