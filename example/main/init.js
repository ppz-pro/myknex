const dbConfg = require('../knexfile').development // 数据库配置
const MyKnex = require('myknex')

const db = new MyKnex(dbConfg)

const user = exports.User = db.setTable('user')
const pet = exports.Pet = db.setTable('pet')

MyKnex.join({
  table: user,
  populatedAs: 'own',
  joinKey: 'id',
  type: 'one'
}, {
  table: pet,
  joinKey: 'owner',
  type: 'many',
  populatedAs: 'pets'
})