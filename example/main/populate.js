const { User, Pet } = require('./init')

async function main(){
  await User.del() // 危险操作！删除所有 user
  await Pet.del() // 危险操作！删除所有 pet

  await User.insert({ // 新建一个用户，id 为 1
    id: 1,
    name: '小明',
    tel: '+8612345678901'
  })
  await Pet.insert({ // 新建一个宠物，owner 为 1
    name: '狗蛋',
    gender: 'female',
    owner: 1
  })
  await Pet.insert({ // 新建一个宠物，owner 为 1
    name: '肥肥',
    gender: 'female',
    owner: 1
  })
  
  const user = await User.fetchOne() // 取出一个 user
  await (await user.populate('pets')).populate('own')
  console.log(JSON.parse(JSON.stringify(user)))
}

main()