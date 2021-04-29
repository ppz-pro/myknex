const dbConfg = require('../knexfile').development // 数据库配置
const knex = require('knex')(dbConfg) // 实例化 Knex
require('myknex').setKnex(knex) // 把 Knex 实例交给 myknex