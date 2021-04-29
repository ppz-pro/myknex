const getKnex = require('./knex').get
const { isNumber } = require('./util')

class Model {
  #tableName
  constructor(tableName){
    this.#tableName = tableName
  }

  #getKnexBuilder(build) {
    const builder = getKnex()(this.#tableName)
    if(build)
      build(builder)
    return builder
  }

  #getFetchBuilder(build){ // 不是 build 就是 where
    return ! (build instanceof Function)
      ? this.#getKnexBuilder( builder => builder.where(build) )
      : this.#getKnexBuilder(build)
  }

  async fetch(build){
    return await this.#getFetchBuilder(build)
  }

  async fetchOne(build){
    if(isNumber(build))
      build = {
        id: build
      }
    const builder = this.#getFetchBuilder(build)
    builder.limit(1)
    const list = await builder
    return list[0]
  }

  fetchById(id){ // 以后再升级为“指定主键”
    return this.fetchOne(id)
  }
}

module.exports = Model