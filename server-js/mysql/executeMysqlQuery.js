const mysql = require('promise-mysql')
const mysqlConfigs = require('./mysqlConfig')

module.exports = (sqlQuery, customSuccessMessage, callback) => {
  mysql.createPool(mysqlConfigs).then( (pool) => {
    pool.getConnection().then( connection => {
      connection.query(sqlQuery).then( (results) => {
        callback && callback(results)
      })
    })
  })
}
