require('./init')
const { Model } = require('myknex') // myknex 核心

const userModel = new Model('user')

async function main(){
  const result = await userModel.fetch({
    id: 1
  })
  console.log(result)
}

main()