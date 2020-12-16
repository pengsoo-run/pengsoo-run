import React from 'react';
import styled from 'styled-components';

import { GameMode } from '~/types/game.type';

import Button from './PopButton';

interface SelectModeProps {
  handleClick: (text: string) => void;
}

function SelectMode({ handleClick }: SelectModeProps) {
  return (
    <>
      <h1>Select Mode</h1>
      <ModeList>
        <Button text={GameMode.P1} onClick={handleClick} />
        <Button text={GameMode.P2} onClick={handleClick} />
        <Button text={GameMode.P3} onClick={handleClick} />
      </ModeList>
    </>
  );
}

const ModeList = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
`;

export default SelectMode;
