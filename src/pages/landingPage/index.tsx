import React from 'react';
import { useEffect, useState } from 'react';
import socket from '../../utils/config/socket';
import MainMenu from '../mainMenu';
import GamePage from '../gamePage';
import './styles.scss';


const SocketContext = React.createContext(socket);

const LandingPage = () => {
  const [loginToken, setLoginToken] = useState('')

  useEffect( function() {
    const currentLoginToken = localStorage.getItem('exilesLoginTokenStorage')
    localStorage && currentLoginToken ? setLoginToken(currentLoginToken) : setLoginToken('')
  }, [])

  socket.on('updateLoginToken', (token: string)=>{
    setLoginToken(token)
    localStorage.setItem('exilesLoginTokenStorage', token)
  })

  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
      { loginToken ? <GamePage /> : <MainMenu />}
      </SocketContext.Provider>
    </div>
  );
}

export default LandingPage;
