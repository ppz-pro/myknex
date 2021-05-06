require('./init')
const { Model } = require('myknex') // myknex 核心

const userModel = new Model('user')

async function main(){
  const result = await userModel.getBuilder({ id: 0 }).decrement('id') // id 为 2 的记录的 id 自减 1（可能报错哦）
  console.log(result)
}

main()