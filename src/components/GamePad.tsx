import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { joinGame, selectPlayer } from '~/store/playerSlice';
import { selectGameProgress } from '~/store/gameSlice';

import GamePadButton from './GamePadButton';

interface MatchParams {
  id: string;
}

function GamePad({ match }: RouteComponentProps<MatchParams>) {
  const { id } = match.params;
  const player = useSelector(selectPlayer);
  const gameProgress = useSelector(selectGameProgress);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(joinGame(id));
  }, []);

  return (
    <Wrapper>
      <p>{gameProgress}</p>
      {player.role && <GamePadButton gameId={id} role={player.role} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #da7e7a;
  background-image: linear-gradient(240deg, #c5736f 0%, #9085b4 100%);
  animation: none;
`;

export default GamePad;
