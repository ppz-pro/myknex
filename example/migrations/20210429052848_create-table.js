exports.up = function(knex) {
  return knex.schema
    .createTable('user', table => {
      table.increments().primary()
      table.string('name')
      table.string('tel')
    })
    .createTable('pet', table => {
      table.increments().primary()
      table.string('name')
      table.enu('gender', ['male', 'female'])
      table.integer('owner').unsigned()
    })
}

exports.down = function(knex) {
  return knex.schema
    .dropTable('pet')
    .dropTable('user')
}