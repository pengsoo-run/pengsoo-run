import React from 'react';
import styled from 'styled-components';

import { GameMode, GameRole } from '~/types/game.type';
import { flexCenter } from './styles/mixin';

interface RoleListProps {
  mode: GameMode;
  size: number;
}

function RoleList({ mode, size }: RoleListProps) {
  console.log('✅   RoleList   mode', mode);
  return (
    <Layout mode={mode}>
      <Role role={GameRole.L} size={size}>
        {GameRole.L}
      </Role>
      <Role role={GameRole.J} size={size}>
        {GameRole.J}
      </Role>
      <Role role={GameRole.R} size={size}>
        {GameRole.R}
      </Role>
    </Layout>
  );
}

const Layout = styled.div<{ mode: GameMode }>`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 60px;
  margin-bottom: 20px;

  div {
    &:nth-child(2) {
      margin-left: ${({ mode }) => {
        if (mode === GameMode.P1 || mode === GameMode.P2) return '-22px';
        return '8px';
      }};
    }

    &:nth-child(3) {
      margin-left: ${({ mode }) => {
        if (mode === GameMode.P1) return '-22px';
        return '8px';
      }};
    }
  }
`;

const Role = styled.div<{ size: number; role: GameRole }>`
  ${flexCenter}
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 50%;
  font-size: ${({ size }) => `${size / 3}px`};
  color: #fff;
  opacity: 0.9;

  background: ${({ role }) => {
    if (role === GameRole.J) return '#df4242';
    return '#f57936';
  }};
  border: 3px solid
    ${({ role }) => {
      if (role === GameRole.J) return '#a01b1b';
      return '#bc4809';
    }};
  box-shadow: 0px 5px 0px
    ${({ role }) => {
      if (role === GameRole.J) return '#a01b1b';
      return '#bc4809';
    }};
`;

RoleList.defaultProps = {
  size: 50,
};

export default RoleList;
