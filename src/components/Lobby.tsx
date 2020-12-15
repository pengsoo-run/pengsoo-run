import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Game, GameMode } from '../types/game.type';
import socketService from '../store/middleware/socketService';
import { initGame, resetGame, selectGame, startGame } from '../store/gameSlice';

import Button from './PopButton';

function Lobby() {
  const game = useSelector(selectGame);
  const dispatch = useDispatch();

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
      <p>QR CODE</p>
      <Buttons>
        <Button text='Select Mode' onClick={() => dispatch(resetGame())} />
        <Button text='Game Start' onClick={() => dispatch(startGame())} />
      </Buttons>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const ModeList = styled.div`
  display: flex;
  height: 200px;
`;

const Buttons = styled.div`
  display: flex;
  height: 100px;
`;

export default Lobby;
