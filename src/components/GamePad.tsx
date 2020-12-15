import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { GameRole } from '~/types/game.type';
import GameButtons from './GameButtons';

interface MatchParams {
  id: string;
}

function GamePad({ match }: RouteComponentProps<MatchParams>) {
  // const { id } = match.params;
  const [role, setRole] = useState<GameRole>(GameRole.ALL);

  useEffect(() => {
    setRole(GameRole.ALL);
  }, []);

  return (
    <Wrapper>
      <GameButtons role={role} />
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
