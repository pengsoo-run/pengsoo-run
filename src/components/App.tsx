import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import styled from 'styled-components';
import { Reset } from 'styled-reset';
import GlobalStyle from './styles/globalStyle';

import socketService from '../store/middleware/socketService';

import Welcome from './Welcome';
import Lobby from './Lobby';
import Game from './Game';
import GamePad from './GamePad';

function App() {
  useEffect(() => {
    socketService.init();
    return () => socketService.disconnect();
  }, []);

  return (
    <Wrapper>
      <Reset />
      <GlobalStyle />
      <div className='content'>
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route path='/lobby' component={Lobby} />
          <Route path='/game' component={Game} />
          <Route path='/gamepad/:id' component={GamePad} />
          <Redirect to='/' />
        </Switch>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    width: 720px;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #061763;
    background-image: url('welcome/game-pad.png');
    background-position: center;
    background-size: cover;
    box-shadow: 0 6px 24px 0 rgba(44, 39, 56, 0.4),
      24px 24px 48px 0 rgba(44, 39, 56, 0.6);
    border-radius: 15px;
    padding: 20px 30px;
    color: white;
    overflow: hidden;
  }
`;

export default App;
