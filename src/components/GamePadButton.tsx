import React from 'react';
import styled from 'styled-components';

import { GameRole } from '../types/game.type';

interface GamePadButtonProps {
  role: GameRole;
}

function GamePadButton({ role }: GamePadButtonProps) {
  switch (role) {
    case GameRole.ALL:
      return (
        <LayoutThree>
          <StyledButton className={GameRole.J}>{GameRole.J}</StyledButton>
          <StyledButton className={GameRole.L}>{GameRole.L}</StyledButton>
          <StyledButton className={GameRole.R}>{GameRole.R}</StyledButton>
        </LayoutThree>
      );
    case GameRole.LR:
      return (
        <LayoutTwo>
          <StyledButton className={GameRole.L}>{GameRole.L}</StyledButton>
          <StyledButton className={GameRole.R}>{GameRole.R}</StyledButton>
        </LayoutTwo>
      );
    case GameRole.J:
    case GameRole.L:
    case GameRole.R:
      return (
        <LayoutOne>
          <StyledButton className={role}>{role}</StyledButton>
        </LayoutOne>
      );
  }
}

const LayoutThree = styled.div`
  .jump,
  .left,
  .right {
    bottom: 15vh;
    width: 20vw;
    height: 20vw;
  }

  .jump {
    right: 5vw;
  }

  .left {
    left: 5vw;
  }

  .right {
    left: 28vw;
  }
`;

const LayoutTwo = styled.div`
  .left,
  .right {
    bottom: 15vh;
    width: 30vw;
    height: 30vw;
  }

  .left {
    left: 5vw;
  }

  .right {
    right: 5vw;
  }
`;

const LayoutOne = styled.div`
  button {
    bottom: 15vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 60vmin;
    height: 60vmin;
    font-size: 12vmin;
  }
`;

const StyledButton = styled.button`
  position: absolute;
  width: 10rem;
  height: 10rem;
  outline: none;
  border: none;
  border-radius: 50%;
  font-family: inherit;
  text-decoration: none;
  font-size: 6vw;
  user-select: none;
  transform: translateY(0px);
  transition: All 0.06s ease-in-out;

  &:active {
    transform: translateY(10px);
    box-shadow: none !important;
    transition: All 0.06s ease-in-out;
  }

  &.jump {
    background: #df4242;
    color: #fff;
    border: 3px solid #a01b1b;
    box-shadow: 0px 12px 0px #a01b1b;
    text-shadow: 1px 1px 1px #a01b1b;
  }

  &.left,
  &.right {
    background: #f57936;
    color: #fff;
    border: 3px solid #bc4809;
    box-shadow: 0px 12px 0px #bc4809;
    text-shadow: 1px 1px 1px #bc4809;
  }
`;

export default GamePadButton;
