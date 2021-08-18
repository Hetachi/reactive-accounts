import { Dispatch, SetStateAction} from 'react';
import socket from './config/socket';
import validateEmail from './validation/emailValidation';
import validatePassword from './validation/passwordValidation';

interface LoginDataTypes {
  email: string,
  password: string
}

const userLogin = (loginData: LoginDataTypes, setLoginError: Dispatch<SetStateAction<string>>) => {
    const { email, password } = loginData
    const username = false
    if(validateEmail(email) && validatePassword(password, password)) {
      socket.emit('login', {username, email, password})
    } else {
      setLoginError('')
    }
  }

  export default userLogin