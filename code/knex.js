let knex

module.exports = {
  get(){
    return knex
  },
  set(k){
    knex = k
  }
}