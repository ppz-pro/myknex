require('./init')
const { Model } = require('myknex')

const userModel = new Model('user')

async function main(){
  let result = await userModel.fetch()
  console.log(result)
  
  result = await userModel.fetch({
    name: 'lun'
  })
  console.log(result)

  result = await userModel.fetch( builder => {
    builder.where({
      name: 'lun'
    })
  })
  console.log(result)

  result = await userModel.fetchOne({
    name: 'lun'
  })
  console.log(result)

  result = await userModel.fetchById(1)
  console.log(result)
}

main()