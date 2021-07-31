module.exports = {
  development: {
    client: 'mysql2', // 连接 sqlte3 数据库
    connection: { // 其他类型的数据库连接配置请参考 https://knexjs.org/#Installation-client
      host: '127.0.0.1',
      user: 'root',
      password: '123456',
      database: 'MYKNEX'
    }
  }
}