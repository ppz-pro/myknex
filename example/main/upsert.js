require('./init')
const { Model } = require('myknex') // myknex 核心

const userModel = new Model('user')

async function main(){
  const result = await userModel.upsert({
    // id: 1, // 如果传入 id，则更新 id 为 1 的记录的 name 为 ppz；否则，新增一条 name 为 ppz 的记录
    name: 'ppz'
  })
  console.log(result)
}

main()