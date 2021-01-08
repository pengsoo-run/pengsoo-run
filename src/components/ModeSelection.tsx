import React from 'react';
import styled from 'styled-components';

import { GameMode } from '~/types/game.type';

import PopButton from './PopButton';
import RoleList from './RoleList';

interface ModeSelectionProps {
  handleClick: (text: string) => void;
}

function ModeSelection({ handleClick }: ModeSelectionProps) {
  return (
    <>
      <Title>Select Mode</Title>
      <ModeList>
        {[GameMode.P1, GameMode.P2, GameMode.P3].map(gameMode => (
          <PopButton key={gameMode} text={gameMode} onClick={handleClick}>
            <RoleList mode={gameMode} selection />
          </PopButton>
        ))}
      </ModeList>
    </>
  );
}

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 400;
  margin: 10px 0;
`;

const ModeList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 240px;
  padding-bottom: 20px;
`;

export default ModeSelection;
