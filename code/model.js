const getKnex = require('./knex').get
const { isNumber } = require('./util')

const knife = global.MyKnexKnife && global.MyKnexKnife.Express

class Model {
  #tableName
  constructor(tableName){
    this.#tableName = tableName
    if(knife)
      knife[tableName] = this
  }

  getBaseBuilder(build) {
    const builder = getKnex()(this.#tableName)
    if(build)
      build(builder)
    return builder
  }

  getBuilder(build){ // 不是 build 就是 where
    return this.getBaseBuilder(
      build && (
        build instanceof Function
          ? build
          : builder => builder.where(build)
      )
    )
  }

  async insert() {
    return await this.getBaseBuilder().insert(...arguments)
  }

  async del(build){
    return await this.getBuilder(build).del()
  }

  async update(build, ...args){
    return await this.getBuilder(build).update(...args)
  }

  async upsert(record, ...args) {
    return await record.id
      ? this.update({
        id: record.id
      }, record, ...args)
      : this.insert(...arguments)
  }

  async fetch(build){
    return await this.getBuilder(build)
  }

  async count(build, target){
    const builder = this.getBuilder(build)
    if(!target)
      target = 'id'
    const [result] = await builder.count(target)
    return Object.values(result)[0]
  }

  async fetchOne(build){
    if(isNumber(build))
      build = {
        id: build
      }
    const builder = this.getBuilder(build)
    builder.limit(1)
    const list = await builder
    return list[0]
  }

  fetchById(id){ // 以后再升级为“指定主键”
    return this.fetchOne(id)
  }

  #populateMap = {}
  hasMany({ model, leftKey = 'id', rightKey, populatedAs }) {
    this.#populateMap[populatedAs] = {
      model, leftKey, rightKey,
      many: true
    }
  }
  hasOne({ model, leftKey, rightKey = 'id', populatedAs }) {
    this.#populateMap[populatedAs || leftKey] = {
      model, leftKey, rightKey,
      one: true
    }
  }
  async #populateOne(record, name){
    const target = this.#populateMap[name]
    if(target.many)
      record[name] = await target.model.fetch({
        [target.rightKey]: record[target.leftKey]
      })
  }

  async populate(data, name){
    if(!data)
      return Promise.resolve()
    
    if(!(data instanceof Array))
      data = [data]
    
    await Promise.all(data.map( record => 
      this.#populateOne(record, name)
    ))
  }
}

module.exports = Model