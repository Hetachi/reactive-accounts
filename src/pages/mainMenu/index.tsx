import { useState } from 'react';
import { Alert, Menu } from 'antd';
import { Typography } from 'antd';
import LoginPage from '../loginPage';
import RegisterPage from '../registerPage';
import './styles.scss';

const { Title } = Typography;

const MainMenu = () => {

  const [ loginError, setLoginError ] = useState('')
  const [ registerError, setRegisterError] = useState('')
  const [ loginFormVisible, setLoginFormVisible ] = useState('login')

  return (
    <div>
      <div>
        {(loginError || registerError) &&
          <Alert 
            message={loginError || registerError}
            type="error" 
            showIcon 
            closable
          />
        }
      </div>

      <div>
        <div>
          <Menu
            defaultSelectedKeys={['login']}
            mode={'horizontal'}
            theme={'dark'}
            onClick={item => setLoginFormVisible(item.key)}
          >
            <Menu.Item key="login">
              Login
            </Menu.Item>
            <Menu.Item key="registration">
              Registration
            </Menu.Item>
          </Menu>
        </div>
        <div>
          {
          loginFormVisible === 'login' ?
            <div className="main-menu__login-container">
              <Title level={3}>Please enter your login information!</Title>
              <LoginPage setLoginError={setLoginError} />
            </div>:
            <div className="main-menu__register-container">
              <Title level={3}>Account creation, please fill in registration form.</Title>
              <RegisterPage setRegisterError={setRegisterError} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
