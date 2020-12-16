import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { GameMode } from '~/types/game.type';
import { createGame, resetGame, selectGame } from '~/store/gameSlice';

import SelectMode from './SelectMode';
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
      {!game.mode && <SelectMode handleClick={selectMode} />}
      {game.id && <WaitingPlayer gameId={game.id} />}
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
    margin-bottom: 20px;
  }
`;

export default Lobby;
