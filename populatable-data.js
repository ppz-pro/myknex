module.exports = class PopulatableData {
  /**
   * 带有 populate 方法的 data 对象
   * @param data knex data
   * @param {import('./table')} table
   */
  constructor(last, table) {
    this.last = last
    this.table = table
  }
  populate(name, build) {

    const { table, rightKey, leftKey, populatedAs, type } = target
    return new PopulatableData(new Promise(res => {
      this.last.then
    }))
  }
  async _populate(name, build) {
    const data = this.data

    
      // populate
      if(data instanceof Array)
        for(let left of data)
          left[populatedAs] = rightMap[left[leftKey]]
      else
        data[populatedAs] = rightMap[data[leftKey]]
      // --- ---

      if(type == 'one') { // 被 populate 数据应是对象，而非数组
        if(data instanceof Array)
          for(let record of data)
            record[populatedAs] = record[populatedAs][0]
        else
          data[populatedAs] = data[populatedAs][0]
      }
    
    return new PopulatableData(ret, table)
  }
  toJSON() {
    return this.data
  }
}

class XXX {
  constructor(last, table) {
    this.last = last
    this.table = table
  }

  populate(name, build) {
    /** @type {import('./types/populate-config')} 被 populate 的目标 */
    const target = this.table.dev.populate[name]
    if(!target)
      throw Error(this.table.dev.name + ' 表上没有 ' + name)

    if(!data) // 如果是空数据，就不用找了
      var ret = type == 'many' ? [] : null
    else if(data instanceof Array && data.length == 0)
      var ret = []
    else {
      // 查！这里是把所有符合条件的结果一次查出来
      const builder = table.getBuilder(build)
      var ret = await (data instanceof Array
        ? builder.whereIn(rightKey, data.map(record => record[leftKey]))
        : builder.where(rightKey, data[leftKey])
      )

      // --- 再把各结果 populate 到正确的位置 ---
      // 把 ret 按 rightKey 值，分到一系列数组中（同一 rightKey 值，可能对应多条记录）
      const rightMap = ret.reduce(function(map, right) { 
        map[right[rightKey]] = map[right[rightKey]] || []
        map[right[rightKey]].push(right)
        return map
      }, {})
    }
  }

  then(cb) {

  }
}