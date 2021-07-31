exports.seed = async function(knex) {
  await knex('user').del()
  await knex('user').insert([
    {id: 1, name: '小明', gender: 2, tel: '110'},
    {id: 2, name: '小红', gender: 1},
    {id: 3, name: '小强', gender: 1, tel: '119'}
  ])
}