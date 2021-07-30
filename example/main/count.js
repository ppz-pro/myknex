const { User } = require('./init')

async function main(){
  const result = await User.count()
  console.log(result)
}

main()