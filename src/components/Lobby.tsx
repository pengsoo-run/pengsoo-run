import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Game, GameMode } from '../types/game.type';
import socketService from '../store/middleware/socketService';
import { initGame, resetGame, selectGame, startGame } from '../store/gameSlice';

import Button from './Button';

function Lobby() {
  const game = useSelector(selectGame);
  const dispatch = useDispatch();

  const selectMode = (selected: string) => {
    const selectedMode = selected as GameMode;
    socketService.createGame(selectedMode, (game: Game) => {
      dispatch(initGame(game));
    });
  };

  return (
    <>
      {!game.mode ? (
        <SelectMode>
          <Title>Select Mode</Title>
          <div className='mode'>
            <Button text={GameMode.P1} onClick={selectMode} />
            <Button text={GameMode.P2} onClick={selectMode} />
            <Button text={GameMode.P3} onClick={selectMode} />
          </div>
        </SelectMode>
      ) : (
        <WaitingPlayer>
          <Title>Waiting for Player</Title>
          <p>QR CODE</p>
          <Button text='다시 선택하기' onClick={() => dispatch(resetGame())} />
          <Button text='게임 시작' onClick={() => dispatch(startGame())} />
        </WaitingPlayer>
      )}
    </>
  );
}

const Title = styled.div`
  font-size: 3rem;
`;

const SelectMode = styled.div`
  .mode {
    display: flex;
    height: 300px;
  }
`;

const WaitingPlayer = styled.div``;

export default Lobby;
