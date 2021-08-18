# JS ACCOUNT SYSTEM TEMPLATE USING MYSQL, WITH FE OF REACT + TS + PHASER CANVAS


## FEATURE LIST

#### Client side
  1. React typescript
  2. SCSS / SASS Modules (With typescript support)
  3. PHASER 3 Canvas loaded into main page
  4. Login page for user with error handling
  5. Registration page for user with error handling
  6. ANT.DESIGN Components
  7. SocketIO (WebSocket) Client

#### Server side
  1. NodeJS Server
  2. SocketIO (WebSocket) Server
  3. MYSQL DB Query system
  4. SERVER SIDE Login / Registration validation (Char escaping)
  5. Server side query error handling
  6. Custom origin access header configuration (For local development, and seperated hosting purposes)


## Pre-requisites

  - Hosted MYSQL DB 
  - MYSQL DB User with write/read permissions
## For mysql configuration please create a new file

Path for `mysqlConfig.js` -> server-js/mysql/

File should contain:
```
module.exports = {
  mysqlPoolLimit: 5000,
  host     : '',
  user     : '',
  password : '',
  database : ''
}
```