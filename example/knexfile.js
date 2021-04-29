module.exports = {
  development: {
    client: 'sqlite3', // 连接 sqlte3 数据库
    connection: { // 其他类型的数据库连接配置请参考 https://knexjs.org/#Installation-client
      filename: './db.sqlite'
    }
  }
}