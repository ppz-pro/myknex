const Knex = require('knex')

module.exports = class {
  constructor() {
    this.name = '表名'
    this.knex = Knex()
    this.PKName = '主键键名'
    this.populate = {}
  }
}
