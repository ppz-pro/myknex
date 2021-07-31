const dbConfg = require('../knexfile').development // 数据库配置
const MyKnex = require('myknex')

const db = new MyKnex(dbConfg)

const user = exports.User = db.setTable('user')
const pet = exports.Pet = db.setTable('pet')
const gender = exports.Gender = db.setTable('gender')

MyKnex.join({
  table: user,
  populatedAs: 'owner',
  joinKey: 'id',
  type: 'one'
}, {
  table: pet,
  joinKey: 'ownerId',
  type: 'many',
  populatedAs: 'pets'
})

MyKnex.join({
  table: user,
  joinKey: 'gender'
}, {
  table: gender,
  joinKey: 'id',
  type: 'one',
  populatedAs: 'sex'
})