import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { buttonDown, buttonUp } from '~/store/playerSlice';
import { PlayerRole } from '../types/game.type';

interface GamePadButtonProps {
  role: PlayerRole;
}

type pressEvent =
  | React.MouseEvent<HTMLButtonElement>
  | React.TouchEvent<HTMLButtonElement>;

function GamePadButton({ role }: GamePadButtonProps) {
  const dispatch = useDispatch();

  const onPressDown = (ev: pressEvent): void => {
    dispatch(buttonDown(ev.currentTarget.textContent));
  };

  const onPressUp = (ev: pressEvent): void => {
    dispatch(buttonUp(ev.currentTarget.textContent));
  };

  let roleList = [];

  switch (role) {
    case PlayerRole.ALL:
      roleList = [PlayerRole.L, PlayerRole.R, PlayerRole.J];
      break;
    case PlayerRole.LR:
      roleList = [PlayerRole.L, PlayerRole.R];
      break;
    default:
      roleList = [role];
      break;
  }

  return (
    <Layout className={role}>
      {roleList.map(role => (
        <StyledButton
          key={role}
          className={role}
          onMouseDown={onPressDown}
          onTouchStart={onPressDown}
          onMouseUp={onPressUp}
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
  position: absolute;
  bottom: 15vh;
  outline: none;
  border: none;
  border-radius: 50%;
  font-family: inherit;
  text-decoration: none;
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
