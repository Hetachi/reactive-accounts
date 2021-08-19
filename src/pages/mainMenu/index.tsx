import { useState } from 'react';
import { Alert } from 'antd';
import LoginPage from '../loginPage';
import './styles.scss';

const MainMenu = () => {

  const [ loginError, setLoginError ] = useState('')

  return (
    <div>
      <div>
        {loginError &&
          <Alert 
            message={loginError}
            type="error" 
            showIcon 
            closable
          />
        }
      </div>

      <LoginPage setLoginError={setLoginError} />
    </div>
  );
}

export default MainMenu;
