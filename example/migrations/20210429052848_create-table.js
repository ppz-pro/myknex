exports.up = function(knex) {
  return knex.schema
    .createTable('user', table => {
      table.increments().primary()
      table.string('name')
      table.string('tel')

      table.timestamp('createdAt', { precision: 6 }).defaultTo(knex.fn.now(6))
      table.timestamp('updatedAt', { precision: 6 }).defaultTo(knex.fn.now(6))
    })
    .createTable('pet', table => {
      table.increments().primary()
      table.string('name')
      table.enu('gender', ['male', 'female'])
      table.integer('owner').unsigned()
      table.foreign('owner').references('user.id')

      table.timestamp('createdAt', { precision: 6 }).defaultTo(knex.fn.now(6))
      table.timestamp('updatedAt', { precision: 6 }).defaultTo(knex.fn.now(6))
    })
}

exports.down = function(knex) {
  return knex.schema
    .dropTable('pet')
    .dropTable('user')
}