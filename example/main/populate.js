require('./init')
const { Model } = require('myknex') // myknex 核心

const userModel = new Model('user')
const petModel = new Model('pet')

userModel.hasMany({
  model: petModel, // 关联 pet
  leftKey: 'id', // user.id
  rightKey: 'owner', // pet.owner
  populatedAs: 'petList' // 取数据时，会把 pet 数据添加到 user 的 petList 属性上
})

async function main(){
  await userModel.del() // 危险操作！删除所有 user
  await petModel.del() // 危险操作！删除所有 pet
  
  await userModel.insert({ // 新建一个用户，id 为 1
    id: 1,
    name: '小明',
    tel: '+8612345678901'
  })
  await petModel.insert({ // 新建一个宠物，owner 为 1
    name: '狗蛋',
    gender: 'female',
    owner: 1
  })
  await petModel.insert({ // 新建一个宠物，owner 为 1
    name: '肥肥',
    gender: 'female',
    owner: 1
  })
  
  const user = await userModel.fetchOne() // 取出一个 user
  await userModel.populate(user, 'petList') // 把 user 的 pet 添加 petList 属性上
  console.log(user)
}

main()