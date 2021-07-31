const { User } = require('./init')

async function main(){
  const result = await User.count( builder => {
    builder.whereNotNull('tel')
  })
  console.log(result)
}

main()