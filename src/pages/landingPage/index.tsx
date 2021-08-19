import React from 'react';
import { useEffect, useState } from 'react';
import { Alert, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import socket from '../../utils/config/socket';
import MainMenu from '../mainMenu';
import GamePage from '../gamePage';
import './styles.scss';

const LandingPage = () => {
  const [loginToken, setLoginToken] = useState('')
  const [socketError, setSocketError] = useState('')

  useEffect( function() {
    const currentLoginToken = localStorage.getItem('exilesLoginTokenStorage')
    localStorage && currentLoginToken ? setLoginToken(currentLoginToken) : setLoginToken('')
  }, [])

  socket.on('connect', () => {
    setSocketError(``)
  })

  socket.on('connect_error', () => {
    setSocketError(`Disconnected from server, attempting to reconnect...`)
  })

  socket.on('disconnect', () => {
    setSocketError(`Disconnected from server, attempting to reconnect...`)
  })

  socket.on('updateLoginToken', (token: string)=>{
    setLoginToken(token)
    localStorage.setItem('exilesLoginTokenStorage', token)
  })

  const Spinner = <LoadingOutlined style={{ fontSize: 24, marginRight: 10 }} spin />;

  return (
    <div className="App">
      
      {
        socketError &&
        <Alert 
          message={socketError}
          type="error" 
          showIcon
          icon={<Spin indicator={Spinner}/>}
        />
      }
      { loginToken ? <GamePage /> : <MainMenu />}
    </div>
  );
}

export default LandingPage;
