import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { theme } from './styles/theme';
import { flexCenter } from './styles/mixin';
import { GlobalStyle } from './styles/globalStyle';

import Welcome from './Welcome';
import Lobby from './Lobby';
import Game from './Game';
import GamePad from './GamePad';

function App() {
  return (
    <Wrapper>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Content>
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route path='/lobby' component={Lobby} />
            <Route path='/game' component={Game} />
            <Route path='/gamepad/:id' component={GamePad} />
            <Redirect to='/' />
          </Switch>
        </Content>
      </ThemeProvider>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${flexCenter}
  width: 100vw;
  height: 100vh;
`;

const Content = styled.div`
  ${flexCenter}
  width: 800px;
  max-height: 600px;
  background-color: ${({ theme }) => theme.color.main};
  background-image: url('lobby/game-pad.png');
  background-position: center;
  background-size: cover;
  box-shadow: 0 6px 24px 0 rgba(44, 39, 56, 0.4),
    24px 24px 48px 0 rgba(44, 39, 56, 0.6);
  border-radius: 15px;
  padding: 20px 30px;
  color: ${({ theme }) => theme.color.sub};
  overflow: hidden;
`;

export default App;
