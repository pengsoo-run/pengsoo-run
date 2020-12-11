import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectGame } from '../store/gameSlice';
import { config } from '../phaser-game/config';

function Game() {
  const game = useSelector(selectGame);

  useEffect(() => {
    new Phaser.Game(config);
  }, []);

  return (
    <div>
      <div id='game-container'>
        <p>{game.id}</p>
        <p>{game.isPlaying}</p>
        <p>{game.mode}</p>
        {game.playerList.map(player => (
          <div key={player.socketId}>
            <p>{player.name}</p>
            <p>{player.socketId}</p>
            <p>{player.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
