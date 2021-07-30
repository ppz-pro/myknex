const Table = require('../table')

module.exports = class {
  constructor() {
    this.table = new Table()
    this.populatedAs = ''
    this.joinKey = ''
    this.type = ''
  }
}