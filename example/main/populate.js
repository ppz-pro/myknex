const { User } = require('./init')

async function main(){
  const user = User.fetchOne()
  user.populate('pets').populate('owner')
  user.populate('sex')
  console.log(await user)
}

main()