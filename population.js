class Population {
  /**
   * 简单且效率尚可的连接查询
   * @param {string} populatedAs
   * @param build
   * @param {Population} upperNode 链之上层的结点
   */
  constructor(populatedAs, build, upperNode) {
    this.lower = []
    this.populatedAs = populatedAs
    this.build = build
    this.upperNode = upperNode
  }

  /** 获取根节点 */
  _getRoot() {
    let node = this
    do {
      if(node instanceof RootPopulation)
        return node
    } while(node = node.upperNode)
    throw Error('未找到头部节点')
  }

  /** 连接查询 */
  populate(populatedAs, build) {
    const lower = new Population(populatedAs, build, this)
    this.lower.push(lower)
    return lower
  }

  // 实现 thenable 接口
  async then(cb) {
    const rootNode = this._getRoot()
    const { table, builder, isList } = rootNode
    let data = await builder
    if(!isList)
      data = data[0]
    await this._go(data, table, rootNode.lower)
    cb(data)
  }

  /** 
   * populate 所有叶子节点
   * @param upperData 上级节点数据
   * @param {import('./table')} upperTable 上级节点所属表
   * @param {Array<Population>} pdList 待 populate 的节点
   */
  async _go(upperData, upperTable, pdList) {
    if(upperData instanceof Array)
      return this._goList(...arguments)
    
    for(let pd of pdList) {
      const { populatedAs, build } = pd
      const { table, rightKey, leftKey, type } = this.getPopConf(upperTable, populatedAs)
      let data = await table.fetch( builder => {
        b(builder, build)
        builder.where(rightKey, upperData[leftKey])
      })
      if(type == 'one')
        data = data[0]
      await this._go(data, table, pd.lower)
      upperData[populatedAs] = data
    }
  }

  async _goList(upperList, upperTable, pdList) {
    for(let pd of pdList) {
      const { populatedAs, build } = pd
      const { table, rightKey, leftKey, type } = this.getPopConf(upperTable, populatedAs)
      let list = await table.fetch( builder => {
        b(builder, build)
        builder.whereIn(rightKey, upperList.map(item => item[leftKey]))
      })
      await this._goList(list, table, pd.lower)
      // 按 rightKey 的值，把 data 分类
      const map = {}
      for(let record of list)
        map[record[rightKey]] = []
      for(let record of list)
        map[record[rightKey]].push(record)
      // populate
      if(type == 'one')
        for(let leftRecord of upperList)
          leftRecord[populatedAs] = map[leftRecord[leftKey]][0]
      else
        for(let leftRecord of upperList)
          leftRecord[populatedAs] = map[leftRecord[leftKey]]
    }
  }

  /**
   * 获取连接查询的配置
   * @returns {import('./types/populate-config')}
   */
  getPopConf(upperTable, populatedAs) {
    const ret = upperTable.dev.populate[populatedAs]
    if(ret)
      return ret
    else
      throw Error(upperTable.dev.name + ' 表上没有 ' + populatedAs)
  }
}

function b(builder, build) {
  if(build instanceof Function)
    build(builder)
  else if(build)
    builder.where(build)
}

class RootPopulation extends Population {
  constructor(table, build, isList) {
    super()
    this.table = table
    this.builder = table.getBuilder(build)
    this.isList = isList
  }
}

module.exports = { Population, RootPopulation }