import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Game, GameMode } from '../types/game.type';
import socketService from '../store/middleware/socketService';
import { initGame, resetGame, selectGame, startGame } from '../store/gameSlice';

import Button from './PopButton';
import QRCode from './QRCode';

function Lobby() {
  const game = useSelector(selectGame);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetGame());
  }, []);

  if (!game.mode) {
    const selectMode = (selected: string) => {
      const selectedMode = selected as GameMode;
      socketService.createGame(selectedMode, (game: Game) => {
        dispatch(initGame(game));
      });
    };

    return (
      <Layout>
        <Title>Select Mode</Title>
        <ModeList>
          <Button text={GameMode.P1} onClick={selectMode} />
          <Button text={GameMode.P2} onClick={selectMode} />
          <Button text={GameMode.P3} onClick={selectMode} />
        </ModeList>
      </Layout>
    );
  }

  return (
    <Layout>
      <Title>Waiting for Player</Title>
      <div className='waiting'>
        <QRCode url={`https://${window.location.host}/gamepad/${game.id}`} />
        <div className='players'>
          <h1>선수명단</h1>
        </div>
      </div>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  .waiting {
    display: flex;

    .players {
      margin-left: 20px;
      border: 2px solid red;
    }
  }
`;

const Title = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const ModeList = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
`;

export default Lobby;
