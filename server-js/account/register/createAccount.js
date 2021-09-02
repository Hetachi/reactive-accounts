const executeMysqlQuery = require('../../mysql/executeMysqlQuery')
const checkIfAccountAlreadyExists = require('../validation/checkIfAccountAlreadyExists')

module.exports = (username, password, email, socket) => {
  if(username && password && email) {
    const accountDefaultStats = {
      level: 1,
      statPoints: 0,
      hp: 100,
      max_hp: 100,
      mana: 200,
      max_mana: 200,
      stamina: 100,
      max_stamina: 100,
      adminLevel: 0,
      strength: 1,
      vitality: 1,
      dextirity: 1,
      inteligence: 1
    }

    const createNewAccountSql = 'INSERT INTO accounts (username, password, adminLevel, email, session, discordId, session_expiry, levels, stat_points, hp, max_hp, mana, max_mana, stamina, max_stamina, coins, gems, strength, vitality, dextirity, inteligence,inventory_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const values = [
      username,
      password,
      accountDefaultStats.adminLevel,
      email,
      0,
      0,
      0,
      accountDefaultStats.level,
      accountDefaultStats.statPoints,
      accountDefaultStats.hp,
      accountDefaultStats.max_hp,
      accountDefaultStats.mana,
      accountDefaultStats.max_mana,
      accountDefaultStats.stamina,
      accountDefaultStats.max_stamina,
      0,
      0,
      accountDefaultStats.strength,
      accountDefaultStats.vitality,
      accountDefaultStats.dextirity,
      accountDefaultStats.inteligence,
      0
    ]




    checkIfAccountAlreadyExists(username, email).then(accountExists => {
      console.log('Does account exist ====> ' + accountExists)
      if(!accountExists) {
        executeMysqlQuery(createNewAccountSql, values, (results) => {
          console.log("New account created: "+username)
          socket.emit('accountCreated', {username, email})
          return results
        })
        console.log('Attempted to create a new user account for: '+username)
      } else {
        console.log('Account already exists for: '+username)
        socket.emit('accountExistsAlready', 'Email adress is already taken')
        return false
      }
    })
  }
}
