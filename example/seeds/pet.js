exports.seed = async function(knex) {
  await knex('pet').del()
  await knex('pet').insert([
    {id: 1, name: '肥肥', gender: 1, ownerId: 2},
    {id: 2, name: '狗蛋', gender: 1, ownerId: 2},
    {id: 3, name: '葫芦娃', gender: 2, ownerId: 1}
  ])
}