require('./init')
const { Model } = require('myknex')

const userModel = new Model('user')

async function main(){
  let result = await userModel.update({
    name: 'lun'
  }, {
    name: 'lunlun'
  })
  console.log(result)

  result = await userModel.update( builder => {
    builder.where('name', 'like', '%lun')
  }, {
    tel: 'lunlun phone'
  })
  console.log(result)
}

main()