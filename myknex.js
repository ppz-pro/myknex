const Knex = require('knex')
const { notString } = require('./util')
const Table = require('./table')

module.exports = class {
  constructor(config) {
    if(config)
      this.knex = Knex(config)
    this.defaultPKName = 'id'
  }

  setTable(tableName) {
    if(notString(tableName))
      throw Error('table name 必须是字符串')
    return new Table({
      name: tableName,
      knex: this.knex,
      PKName: this.defaultPKName
    })
  }
}