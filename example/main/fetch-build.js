require('./init')
const { Model } = require('myknex') // myknex 核心

const userModel = new Model('user')

async function main(){
  const result = await userModel.fetch( builder => { // 回调里的 builder 是原生 KnexQueryBuilder 对象
    builder.where({ id: 1 })
    builder.whereNot({ name: '小红' }) // 可以调用所有的 KnexQueryBuilder 方法 https://knexjs.org/#Builder
  })
  console.log(result)
}

main()