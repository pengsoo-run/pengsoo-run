import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Reset } from 'styled-reset';

import Welcome from './Welcome';
import Lobby from './Lobby';
import GamePad from './GamePad';

import GlobalStyle from './styles/globalStyle';

function App() {
  return (
    <Container>
      <Reset />
      <GlobalStyle />
      <Switch>
        <Route exact path='/' component={Welcome} />
        <Route path='/game' component={Lobby} />
        <Route path='/gamepad/:id' component={GamePad} />
        <Redirect to='/' />
      </Switch>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
