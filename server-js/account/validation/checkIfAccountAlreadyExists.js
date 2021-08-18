const executeMysqlQuery = require('../../mysql/executeMysqlQuery')
const mysqlConfig = require('../../mysql/mysqlConfig')
const mysql = require('promise-mysql')

module.exports = (username, email) => {
  return new Promise ( (resolve, reject) => {
    function doesAccountExist(results) {
      console.log('Fetching account info for registration... found:')
      console.log(results)
      if(results.length > 0) {
        resolve(true)
      } else {
        resolve(false)
      }
    }
    mysql.createPool(mysqlConfig).then( pool => {
      executeMysqlQuery('SELECT * FROM accounts WHERE email='+pool.escape(email)+' OR username='+pool.escape(username)+'','', doesAccountExist)
    })
  })
}
