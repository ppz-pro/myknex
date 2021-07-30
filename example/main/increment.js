const { User } = require('./init')

async function main(){
  const result = await User.getBuilder({ id: 8 }).increment('id') // id 为 -1 的记录的 id 自增 1（可能报错哦）
  console.log(result)
}

main()