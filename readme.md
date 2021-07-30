# myknex
一个简洁的 knex 封装  
+ 充分暴露 knex 的特性
+ 提供简洁的 orm 接口
+ 提供简洁的连接查询接口

> 如果你不熟悉 knex，且感兴趣的话，可以先[了解一下 knex](https://knexjs.org/)

# demo
### 初始化项目
##### 新建项目
``` bash
npm install -g knex # 全局安装 knex，以使用 knex 提供的数据库迁移工具
mkdir test-myknex # 创建项目目录
cd test-myknex # 进入目录
npm init -y # 初始化项目
npm install knex sqlite3 myknex # 安装 knex、sqlite3、myknex（可能需要下载一会）
```

##### 数据库配置信息（用以建立连接）
``` bash
knex init # 生成 knex 配置文件： knexfile.js 文件（手动创建也可以）
```
把下面的配置信息放在刚生成的 ```knexfile.js``` 里面
``` js
module.exports = {
  development: {
    client: 'sqlite3', // 连接 sqlte3 数据库
    connection: { // 其他类型的数据库连接配置请参考 https://knexjs.org/#Installation-client
      filename: './db.sqlite'
    }
  }
}
```
##### 建表
``` bash
knex migrate:make create-table # 创建数据库迁移文件
```
把下面的迁移配置（创建表）放到刚才生成的 ```migrations/xxxxxxxxxxxxxx_create-table.js``` 文件里
``` js
exports.up = function(knex) {
  return knex.schema
    .createTable('user', table => { // 创建 user 表
      table.increments().primary() // 新建一个自增的列，默认列的名称为 id；再设置为主键
      table.string('name')
      table.string('tel') // 新建一个 varchar(255) 类型的列，取名为 tel
    })
    .createTable('pet', table => { // 创建 pet 表
      table.increments().primary()
      table.string('name')
      table.enu('gender', ['male', 'female']) // 新建一个枚举类型（enum）的列，取名为 gender，取值范围是：['male', 'femal']
      table.integer('owner').unsigned() // 新建一个无符号（unsigned）的整形（integer）列，取名为 owner（用以关联 user 表）
    })
}

exports.down = function(knex) {
  return knex.schema
    .dropTable('pet') // 回滚时，删除 pet 表
    .dropTable('user') // 回滚时，删除 user 表
}
```

``` bash
knex migrate:latest # 让 sqlite3 创建表（迁移到最新的表结构）
```

> 项目初始化完毕

### 基本的增删改查
##### 建立连接
新建 ```main/init.js``` 文件，放入以下内容：
``` js
const dbConfg = require('../knexfile').development // 数据库配置
const knex = require('knex')(dbConfg) // 实例化 Knex
require('myknex').setKnex(knex) // 把 Knex 实例交给 myknex
```
##### insert
新建 ```main/insert.js``` 文件，并放入以下内容：
``` js
require('./init')
const { Model } = require('myknex') // myknex 核心

const userModel = new Model('user')

async function main(){
  const result = await userModel.insert({
    name: '小明'
  })
  console.log(result)
}

main()
```
运行！
``` bash
node main/insert.js
```
你会看到输出 ```[1]```（如果第一次执行）  
说明你已经插入了一个 name 为“小明”的用户信息  
你可以通过下面的 ```fetch``` demo 看一下刚刚插入的数据  

> knex 的连接会一直保持，你需要手动 ```ctrl+c``` 停止程序

##### fetch
新建 ```main/fetch.js``` 文件，并放入以下内容：
``` js
require('./init')
const { Model } = require('myknex') // myknex 核心

const userModel = new Model('user')

async function main(){
  const result = await userModel.fetch()
  console.log(result)
}

main()
```

运行！
``` bash
node main/fetch.js
```
你会看到刚才 insert 进去的数据（数组类型）  
默认情况下，fetch 返回所有数据  
当然，实际的项目中，肯定要带查询条件的，即下面的例子

##### 查询 id 为 1 的 user
``` js
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
```
fetch 的结果是一个数组，即使结果里只有一条记录  
但是 myknex 还提供了 ```fetchOne```，```fetchById```  
我想你能猜到怎么用：
``` js
userModel.fetchOne({
  id: 1
})
userModel.fetchById(1)
```

##### fetch(build)
myknex 通过回调暴露 knex 的[链式 QueryBuilder](https://knexjs.org/#Builder)  
如果 fetch 的第一个参数是函数类型，那么：
``` js
require('./init')
const { Model } = require('myknex') // myknex 核心

const userModel = new Model('user')

async function main(){
  const result = await userModel.fetch( builder => { // 回调里的 builder 是原生 KnexQueryBuilder 对象
    builder.where({ id: 1 })
    builder.whereNot({ name: '小红' }) // 可以调用所有的 KnexQueryBuilder 方法 https://knexjs.org/#Builder
  })
  console.log(result)
}

main()
```
通过回调暴露的 builder 对象，是原生 KnexQueryBuilder 对象  
[可以调用 where、whereNot、whereBetween、orderBy、offset、limit 等方法](https://knexjs.org/#Builder)  

##### update
``` js
require('./init')
const { Model } = require('myknex') // myknex 核心

const userModel = new Model('user')

async function main(){
  const result = await userModel.update({
    name: '小明'
  }, {
    name: '大明'
  })
  console.log(result)
}

main()
```
update 的第一个参数跟 fetch 一样：
+ 可以是一个 where 对象
+ 可以是一个 build 函数

也就是```筛选条件```  
第二个参数是```更新数据```  
返回```被更新的记录的条数```  
上面的例子，把 name 为“小明”的 user，改为 ```name: "大明"```  
你可以通过上面的 fetch 例子验证一下

##### upsert
更新与新增，在大多数情况下，操作非常类似  
upsert 方法的作用在于，可以接收一个记录（record）  
如果 record 有 id 属性，则按 id 更新一条记录  
否则新增一条记录  
``` js
require('./init')
const { Model } = require('myknex') // myknex 核心

const userModel = new Model('user')

async function main(){
  const result = await userModel.upsert({
    // id: 1, // 如果传入 id，则更新 id 为 1 的记录的 name 为 ppz；否则，新增一条 name 为 ppz 的记录
    name: 'ppz'
  })
  console.log(result)
}

main()
```

##### delete
``` js
require('./init')
const { Model } = require('myknex') // myknex 核心

const userModel = new Model('user')

async function main(){
  const result = await userModel.del({
    name: '大明'
  })
  console.log(result)
}

main()
```
del 方法的参数跟 fetch 也一样……

### populate
上文中，我们创建了俩表（user、pet）  
一般情况下，user 和 pet 是一对多的关系（一个人可以拥有多个宠物）  
那么查询用户的时候，有时也需要他\她的宠物信息  
我们可以：
+ 先查询出 user 数据
+ 再根据 userId 关联 pet.owner 取出 pet 数据

或者：
可以使用 ```populate```  
```populate``` 是 myknex 提供的一个非常便利的**取关联数据**的方法：
``` js
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
```
populate 也可以接收一个 list：
``` js
const userList = await userModel.fetch()
await userModel.populate(userList, 'petList')
```
于是，所有用户和他们的宠物信息都取出来了

##### 其他
+ [count](https://github.com/daGaiGuanYu/myknex/blob/master/example/main/count.js)
+ [increment](https://github.com/daGaiGuanYu/myknex/blob/master/example/main/increment.js)
+ [decrement](https://github.com/daGaiGuanYu/myknex/blob/master/example/main/decrement.js)

# 贡献
+ 批评
+ pr
+ issue
+ 完善文档

# 版权
无，可以随意复制、修改、重新发布，不需要注明作者
