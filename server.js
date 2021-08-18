var port = process.env.PORT || 8081;
var app = require('express')();
const server = app.listen(port);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
})
const { v1: uuid } = require('uuid');
const mysqlConfig = require('./server-js/mysql/mysqlConfig')
const executeMysqlQuery = require('./server-js/mysql/executeMysqlQuery')
const createAccount = require('./server-js/account/register/createAccount')
const checkIfAccountInfoIsValid = require('./server-js/account/validation/checkIfAccountInfoIsValid')
const checkIfAccountAlreadyExists = require('./server-js/account/validation/checkIfAccountAlreadyExists')
const userLoggedIn = require('./server-js/account/login/loginUser')

//const createTableIfNoneExists = 'CREATE TABLE `'+ mysqlConfig.database +'`.`accounts` ( `id` INT NOT NULL AUTO_INCREMENT , `username` VARCHAR(64) NOT NULL , `password` VARCHAR(64) NOT NULL , `adminLevel` VARCHAR(64) NOT NULL ,  `email` VARCHAR(64) NOT NULL, `session` VARCHAR(64) NOT NULL , `discordId` VARCHAR(64) NOT NULL , `session_expiry` VARCHAR(64) NOT NULL , `levels` VARCHAR(64) NOT NULL , `stat_points` VARCHAR(64) NOT NULL , `hp` VARCHAR(64) NOT NULL , `max_hp` VARCHAR(64) NOT NULL , `mana` VARCHAR(64) NOT NULL , `max_mana` VARCHAR(64) NOT NULL , `stamina` VARCHAR(64) NOT NULL , `max_stamina` VARCHAR(64) NOT NULL , `coins` VARCHAR(64) NOT NULL , `gems` VARCHAR(64) NOT NULL , `strength` VARCHAR(64) NOT NULL, `vitality` VARCHAR(64) NOT NULL, `dextirity` VARCHAR(64) NOT NULL, `inteligence` VARCHAR(64) NOT NULL, `inventory_id` VARCHAR(64) NOT NULL , PRIMARY KEY (`id`))'

//executeMysqlQuery(createTableIfNoneExists, "Created a mysql table for accounts if there wasn't one")

io.on('connection', (socket) => {
  console.log('User has connected to server: '+socket.id)

  socket.on('registerAccount', (accountData)=>{
    console.log('Account registration request recieved')
    console.log(accountData)
    if(checkIfAccountInfoIsValid(accountData)) {
      console.log('Account registration data correct moving to createAccount')
      createAccount(accountData.username, accountData.password, accountData.email, socket)
    }
  })

  socket.on('login', (loginData) => {
    console.log("Login request recieved")
    console.log(loginData)
    if(checkIfAccountInfoIsValid(loginData) && checkIfAccountAlreadyExists(loginData.email, loginData.username)) {
      console.log('Recieved data corresponds to correct email and username')
      userLoggedIn(loginData.email, loginData.password).then((isUserLoggedIn)=>{
        if(isUserLoggedIn) {
          const userSessionId = uuid()
          
          socket.emit('updateLoginToken', userSessionId)
          console.log(userSessionId)
        } else {
          console.log('User failed to login')
          socket.emit('incorrectLoginData', 'User failed to login')
        }
      })
    }
  })

})

console.log('Server started', Date.now())