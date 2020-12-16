import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { GameMode } from '~/types/game.type';
import { createGame, resetGame, selectGame } from '~/store/gameSlice';

import ModeSelection from './ModeSelection';
import WaitingPlayer from './WaitingPlayer';

function Lobby() {
  const game = useSelector(selectGame);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetGame());
  }, []);

  const selectMode = (selected: string) => {
    const selectedMode = selected as GameMode;
    dispatch(createGame(selectedMode));
  };

  return (
    <Layout>
      {!game.mode && <ModeSelection handleClick={selectMode} />}
      {game.id && (
        <WaitingPlayer gameId={game.id} playerList={game.playerList} />
      )}
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  h1 {
    font-size: 3rem;
    margin: 10px 0;
  }
`;

export default Lobby;
