const { User } = require('./init')

async function main(){
  const result = await User.del({
    name: '大明'
  })
  console.log(result)
}

main()