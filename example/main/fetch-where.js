const { User } = require('./init')

async function main(){
  const result = await User.fetch({
    id: 8
  })
  console.log(result)
}

main()