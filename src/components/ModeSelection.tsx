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
      <h1>Select Mode</h1>
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

const ModeList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  height: 240px;
  padding: 20px 0;
`;

export default ModeSelection;
