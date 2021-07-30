const { User } = require('./init')

async function main(){
  const result = await User.fetch()
  console.log(result)
}

main()