exports.seed = async function(knex) {
  await knex('gender').del()
  await knex('gender').insert([
    {id: 1, name: '女'},
    {id: 2, name: ' 男'}
  ])
}