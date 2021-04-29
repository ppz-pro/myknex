let knex

module.exports = {
  get(){
    if(!knex) throw 'Have you set knex instance?'
    return knex
  },
  set(k){
    knex = k
  }
}