import React from 'react';

import { Lobby } from './features/lobby/Lobby';
import { Game } from './features/game/Game';

function App() {
  return (
    <div className='App'>
      <h1>Pengsoo Run</h1>
      <Lobby />
      <Game />
    </div>
  );
}

export default App;
