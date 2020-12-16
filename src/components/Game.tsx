import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { resetGame, selectGame } from '../store/gameSlice';
import { config } from '../phaser-game/config';

import PopButton from './PopButton';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

function Game() {
  const game = useSelector(selectGame);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // if (!game.isPlaying) return history.push('/');

    const phaserGame = new Phaser.Game(config);

    return () => {
      phaserGame.destroy(true);
      dispatch(resetGame());
    };
  }, [game]);

  return (
    <Layout>
      <div id='game-container' />
      <GameUI>
        <Link to='/'>
          <PopButton size='20px' text='Finish Game' />
        </Link>
        <p>{game.id}</p>
        {game.playerList.map(player => (
          <div key={player.id}></div>
        ))}
      </GameUI>
    </Layout>
  );
}

const Layout = styled.div`
  position: relative;
`;

const GameUI = styled.div`
  position: absolute;
  top: 20px;
  right: 15px;
  z-index: 2;
`;

export default Game;
