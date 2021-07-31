const RootPopulation = require('./population').RootPopulation

module.exports = class {
  /** @param {import('./types/table-config')} config */
  constructor(config) {
    config.populate = {}
    this.dev = config
  }

  fetch(build) {
    return new RootPopulation(this, build, true)
  }

  fetchOne(build) {
    return new RootPopulation(this, build)
  }

  fetchByPK(pk) {
    return new RootPopulation(this, {
      [this.dev.PKName]: pk
    })
  }

  async count(build, target = this.dev.PKName){
    const [result] = await this.getBuilder(build).count(target)
    return Object.values(result)[0]
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
    const pk = this.dev.PKName
    return await record[pk]
      ? this.update({
        [pk]: record[pk]
      }, record, ...args)
      : this.insert(...arguments)
  }

  /** 每一次 sql 都要新的 builder */
  getBaseBuilder() {
    return this.dev.knex(this.dev.name)     
  }
  /** 使用回调函数或 where 对象构造一个 builder */
  getBuilder(build) {
    let ret = this.getBaseBuilder()
    if(build instanceof Function) // build 有可能是函数
      build(ret)
    else if(build) // 也可能是 where 对象
      ret.where(build)
    
    return ret
  }
}