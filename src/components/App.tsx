import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Lobby from './Lobby';
import GamePad from './GamePad';

function App() {
  return (
    <div className='App'>
      <h1>Pengsoo Run</h1>
      <Switch>
        <Route exact path='/' component={Lobby} />
        <Route path='/gamepad/:id' component={GamePad} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
