require('./init')
const { Model } = require('myknex')

const userModel = new Model('user')

async function main(){
  const result = await userModel.insert([{
    name: 'lun',
    tel: 'lun phone'
  },{
    name: 'lun',
    tel: 'lun phone'
  }])
  console.log(result)
}

main()