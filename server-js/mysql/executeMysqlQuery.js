const mysql = require('promise-mysql')
const mysqlConfigs = require('./mysqlConfig')

module.exports = (sqlQuery, sqlQueryValues, callback) => {
  mysql.createPool(mysqlConfigs).then( (pool) => {
    pool.getConnection().then( connection => {
      connection.query(sqlQuery, sqlQueryValues).then( (results) => {
        callback && callback(results)
      })
    })
  })
}
