import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { resetGame, selectGame } from '../store/gameSlice';
import { config } from '../phaser-game/config';

function Game() {
  const game = useSelector(selectGame);
  const dispatch = useDispatch();

  useEffect(() => {
    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
      dispatch(resetGame());
    };
  }, []);

  return (
    <div>
      <div id='game-container'>
        <p>{game.id}</p>
        <p>{game.isPlaying}</p>
        <p>{game.playerCount}</p>
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
