const { User } = require('./init')

async function main(){
  const result = await User.getBuilder({ id: 7 }).decrement('id') // id 为 2 的记录的 id 自减 1（可能报错哦）
  console.log(result)
}

main()