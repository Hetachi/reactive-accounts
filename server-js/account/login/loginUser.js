const executeMysqlQuery = require('../../mysql/executeMysqlQuery')
const mysqlConfig = require('../../mysql/mysqlConfig')
const mysql = require('promise-mysql')

module.exports = (email, password) => {
    return new Promise ( (resolve, reject) => {
        function handleAccountData(result) {
            if(result[0] && result[0].email === email && result[0].password === password) {
                console.log('User data checks out, considering user logged in')
                resolve(true)
            } else {
                console.log('Login data incorrect')
                resolve(false)
            }
        }
        mysql.createPool(mysqlConfig).then( pool => {
            executeMysqlQuery('SELECT * FROM accounts WHERE email='+pool.escape(email)+'','', handleAccountData)
        })
    })
}