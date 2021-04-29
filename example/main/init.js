const Knex = require('knex')
const dbConfig = require('../knexfile')
const { setKnex } = require('myknex')

const knex = Knex(dbConfig.development)
setKnex(knex)