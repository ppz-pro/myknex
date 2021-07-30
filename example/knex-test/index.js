const dbConfig = require('../knexfile').development // 数据库配置
const Knex = require('knex')

const knex = new Knex(dbConfig)

;(async function() {
  const test = knex('user')
  console.log(await test.count('id'))
})()