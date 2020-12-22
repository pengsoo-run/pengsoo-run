import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { joinGame, leaveGame, selectPlayer } from '~/store/playerSlice';
import { selectError, selectGameProgress } from '~/store/gameSlice';

import GamePadButton from './GamePadButton';
import ErrorBox from './ErrorBox';

interface MatchParams {
  id: string;
}

function GamePad({ match }: RouteComponentProps<MatchParams>) {
  const { id } = match.params;
  const player = useSelector(selectPlayer);
  const gameProgress = useSelector(selectGameProgress);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(joinGame(id));

    return () => {
      dispatch(leaveGame(id));
    };
  }, []);

  return (
    <Wrapper>
      <Info>[ {gameProgress} ]</Info>
      {player.role && <GamePadButton role={player.role} />}
      {error && <ErrorBox message={error} />}
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

const Info = styled.div`
  position: absolute;
  width: 100vw;
  color: white;
  text-align: right;
  font-size: 3vw;
  padding: 5px 10px;
`;

export default GamePad;
