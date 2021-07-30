const { User } = require('./init')

async function main(){
  const result = await User.insert({
    name: '小明'
  })
  console.log(result)
}

main()