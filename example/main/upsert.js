const { User } = require('./init')

async function main(){
  const result = await User.upsert({
    // id: 1, // 如果传入 id，则更新 id 为 1 的记录的 name 为 ppz；否则，新增一条 name 为 ppz 的记录
    name: 'upsert'
  })
  console.log(result)
}

main()