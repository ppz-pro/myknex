const Table = require('../table')

module.exports = class {
  constructor() {
    this.table = new Table()
    this.type = ''
    this.populatedAs = ''
    this.leftKey = ''
    this.rightKey = ''
  }
}