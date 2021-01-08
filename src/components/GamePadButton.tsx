import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { PlayerRole } from '~/types/game.type';
import { buttonDown, buttonUp } from '~/store/playerSlice';
import { getRoleList } from '~/util/gameUI';

import { orangeSet, redSet } from './styles/mixin';

interface GamePadButtonProps {
  role: PlayerRole;
}

function GamePadButton({ role }: GamePadButtonProps) {
  const dispatch = useDispatch();

  const onPressDown = (ev: React.TouchEvent<HTMLButtonElement>): void => {
    dispatch(buttonDown(ev.currentTarget.textContent));
  };

  const onPressUp = (ev: React.TouchEvent<HTMLButtonElement>): void => {
    dispatch(buttonUp(ev.currentTarget.textContent));
  };

  return (
    <Layout className={role}>
      {getRoleList(role).map(role => (
        <StyledButton
          key={role}
          className={role}
          onTouchStart={onPressDown}
          onTouchEnd={onPressUp}>
          {role}
        </StyledButton>
      ))}
    </Layout>
  );
}

const Layout = styled.div`
  &.all {
    .left {
      left: 5vw;
    }

    .right {
      left: 28vw;
    }

    .jump {
      right: 5vw;
    }

    button {
      width: 20vw;
      height: 20vw;
      max-width: 35vmin;
      max-height: 35vmin;
      font-size: 8vmin;
    }
  }

  &.left-right {
    .left {
      left: 5vw;
    }

    .right {
      right: 5vw;
    }

    button {
      width: 30vw;
      height: 30vw;
      font-size: 12vmin;
    }
  }

  &.left,
  &.right,
  &.jump {
    button {
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 70vmin;
      height: 70vmin;
      font-size: 20vmin;
    }
  }
`;

const StyledButton = styled.button`
  all: unset;
  position: absolute;
  bottom: 15vh;
  border-radius: 50%;
  font-family: inherit;
  text-align: center;
  user-select: none;
  transform: translateY(0);
  transition: All 0.06s ease-in-out;

  &:active {
    transform: translateY(10px);
    box-shadow: none;
    transition: All 0.06s ease-in-out;
  }

  &.jump {
    ${redSet}
  }

  &.left,
  &.right {
    ${orangeSet}
  }
`;

export default GamePadButton;
