const executeMysqlQuery = require('./server-js/mysql/executeMysqlQuery')

module.exports = {
    level: executeMysqlQuery(''),
    username: executeMysqlQuery(''),
    email: executeMysqlQuery(''),
    session: executeMysqlQuery(''),
    session_salt: executeMysqlQuery(''),
    session_expiry: executeMysqlQuery(''),
    adminLevel: executeMysqlQuery(''),
    levels: executeMysqlQuery(''),
    stat_points: executeMysqlQuery(''),
    hp: executeMysqlQuery(''),
    max_hp: executeMysqlQuery(''),
    mana: executeMysqlQuery(''),
    max_mana: executeMysqlQuery(''),
    stamina: executeMysqlQuery(''),
    max_stamina: executeMysqlQuery(''),
    coins: executeMysqlQuery(''),
    gems: executeMysqlQuery(''),
}
