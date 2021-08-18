import socket from './config/socket'
import validateEmail from './validation/emailValidation'
import validateUsername from './validation/usernameValidation'
import validatePassword from './validation/passwordValidation'

interface registerDataTypes {
  email: string,
  username: string,
  password: string,
  password2: string
}

const userRegister = (registerData: registerDataTypes) => {
    const { email, username, password, password2 } = registerData
    if(validateEmail(email) && validateUsername(username) && validatePassword(password, password2)) {
      console.log('validation passed')
      socket.emit('registerAccount', {username, email, password})
    }
  }

export default userRegister