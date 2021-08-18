export default function validatePassword(password: string, password2: string) {
    if(password.length >= 8 && password === password2 && password.length < 32) {
      return true
    } else {
      return false
    }
  }