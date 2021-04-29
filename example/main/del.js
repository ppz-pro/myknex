require('./init')
const { Model } = require('myknex')

const userModel = new Model('user')

async function main(){
  const result = await userModel.del({
    name: 'pan'
  })
  console.log(result)
}

main()