require('./init')
const { Model } = require('myknex')

const userModel = new Model('user')
const petModel = new Model('pet')
userModel.hasMany({
  model: petModel,
  leftKey: 'id',
  rightKey: 'owner',
  populatedAs: 'petList' // default to the value of rightKey
})

async function main(){
  await userModel.del() // danger!
  await userModel.insert({
    name: 'lun',
    tel: '110'
  })
  const user = await userModel.fetchOne()
  console.log(user)

  await petModel.del() // danger!
  await petModel.insert({
    owner: user.id,
    name: 'goudan',
    gender: 'female'
  })
  await petModel.insert({
    owner: user.id,
    name: 'feifei',
    gender: 'male'
  })
  await petModel.insert({
    name: 'yemao',
    gender: 'female'
  })

  await userModel.populate(user, 'petList')

  console.log(user)
}

main()