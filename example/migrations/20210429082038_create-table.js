exports.up = function(knex) {
  return knex.schema
    .createTable('user', table => { // 创建 user 表
      table.increments().primary() // 新建一个自增的列，默认列的名称为 id；再设置为主键
      table.string('name')
      table.integer('gender')
      table.string('tel') // 新建一个 varchar(255) 类型的列，取名为 tel
    })
    .createTable('pet', table => { // 创建 pet 表
      table.increments().primary()
      table.string('name')
      table.integer('gender')
      table.integer('ownerId').unsigned() // 新建一个无符号（unsigned）的整形（integer）列，取名为 owner（用以关联 user 表）
    })
    .createTable('gender', table => {
      table.increments().primary()
      table.string('name')
    })
}

exports.down = function(knex) {
  return knex.schema
    .dropTable('pet') // 回滚时，删除 pet 表
    .dropTable('user') // 回滚时，删除 user 表
}