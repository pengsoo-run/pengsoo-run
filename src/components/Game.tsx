import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { GameProgress } from '../types/game.type';
import { selectGame } from '../store/gameSlice';
import { config } from '../phaser-game/config';

import PopButton from './PopButton';
import ErrorBox from './ErrorBox';

function Game() {
  const history = useHistory();
  const game = useSelector(selectGame);

  useEffect(() => {
    const phaserGame = new Phaser.Game(config);
    return () => {
      phaserGame.destroy(true);
    };
  }, []);

  useEffect(() => {
    if (game.progress === GameProgress.WAITING) return history.push('/');
  }, [game]);

  return (
    <Layout>
      {game.error && <ErrorBox message={game.error} />}
      {game.progress === GameProgress.GAMEOVER && <ErrorBox message={'GAME OVER'} />}
      <div id='game-container' />
      <GameUI>
        <Link to='/'>
          <PopButton size='20px' text='FINISH GAME' />
        </Link>
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
  right: 330px;
  z-index: 2;
`;

export default Game;
