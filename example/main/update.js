const { User } = require('./init')

async function main(){
  const result = await User.update({
    name: '小明'
  }, {
    name: '大明'
  })
  console.log(result)
}

main()