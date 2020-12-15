import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { resetGame, selectGame } from '../store/gameSlice';
import { config } from '../phaser-game/config';

import Button from './PopButton';
import { Link } from 'react-router-dom';

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
    <div id='game-container'>
      <Link to='/'>
        <Button text='Finish Game' />
      </Link>
      <p>{game.id}</p>
      {game.playerList.map(player => (
        <div key={player.id}>
          <p>{player.id}</p>
          <p>{player.role}</p>
        </div>
      ))}
    </div>
  );
}

export default Game;
