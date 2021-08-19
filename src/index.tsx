import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './pages/landingPage';
import './index.scss';
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>,
  document.getElementById('root')
);