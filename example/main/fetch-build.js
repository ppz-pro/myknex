const { User } = require('./init')

async function main(){
  const result = await User.fetch( builder => { // 回调里的 builder 是原生 KnexQueryBuilder 对象
    builder.where({ id: 8 })
    builder.whereNot({ name: '大明' }) // 可以调用所有的 KnexQueryBuilder 方法 https://knexjs.org/#Builder
  })
  console.log(result)
}

main()