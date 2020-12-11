import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startGame, endGame, selectGame } from './gameSlice';

import { config } from '../../phaser-game/config';

export function Game() {
  const game = useSelector(selectGame);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!game.isPlaying) return;
    new Phaser.Game(config);
  }, [game]);

  return (
    <div>
      {game.isPlaying ? (
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
          <button onClick={() => dispatch(endGame())}>게임종료</button>
        </div>
      ) : (
        <button onClick={() => dispatch(startGame())}>게임시작</button>
      )}
    </div>
  );
}
