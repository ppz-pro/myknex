const Table = require('./table')
const { notString } = require('./util')

/**
 * @param {import('./types/join-config')} table1 
 * @param {import('./types/join-config')} table2 
 */
module.exports = function(table1, table2) {
  checkJoin(table1)
  checkJoin(table2)
  join(table1, table2)
  join(table2, table1)
}

const type = ['many', 'one']
function checkJoin(table) {
  if(!(table.table instanceof Table))
    throw Error('table 必须是 MyKnex.Table 或其子类型，即 "knex/table.js"')
  if(notString(table.joinKey))
    throw Error('joinKey 必须是字符串')
  if(notString(table.populatedAs))
    throw Error('populatedAs 必须是字符串')
  if(type.indexOf(table.type) == -1)
    throw Error('type 必须是 many 或 one')
}

function join(table1, table2) {
  table1.table.dev.populate[table2.populatedAs] = {
    table: table2.table,
    type: table2.type,
    populatedAs: table2.populatedAs,
    leftKey: table1.joinKey,
    rightKey: table2.joinKey
  }
}