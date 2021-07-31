const { User } = require('./init')

async function main(){
  const result = await User.del({
    id: 4
  })
  console.log(result)
}

main()