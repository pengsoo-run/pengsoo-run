import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { GameMode, Player, PlayerRole } from '~/types/game.type';

import { flexCenter } from './styles/mixin';

interface RoleListProps {
  mode: GameMode;
  size: number;
  playerList: Player[];
  selection: boolean;
}

function RoleList({ mode, size, playerList, selection }: RoleListProps) {
  const [connectedPlayer, setConnectedPlayer] = useState<PlayerRole[]>([]);

  useEffect(() => {
    const filtered: PlayerRole[] = [];

    for (const player of playerList) {
      if (!player.id || !player.role) continue;

      if (player.role === PlayerRole.ALL) {
        filtered.push(PlayerRole.L, PlayerRole.R, PlayerRole.J);
      } else if (player.role == PlayerRole.LR) {
        filtered.push(PlayerRole.L, PlayerRole.R);
      } else {
        filtered.push(player.role);
      }
    }

    setConnectedPlayer(filtered);
  }, [playerList]);

  const playerRoleList =
    mode === GameMode.P2
      ? [PlayerRole.L, PlayerRole.R, PlayerRole.J]
      : [PlayerRole.L, PlayerRole.J, PlayerRole.R];

  return (
    <Layout mode={mode} size={size}>
      {playerRoleList.map(role => (
        <Role
          key={role}
          role={role}
          size={size}
          isConnected={selection || connectedPlayer.includes(role)}>
          {role}
        </Role>
      ))}
    </Layout>
  );
}

const Layout = styled.div<{ size: number; mode: GameMode }>`
  display: flex;
  justify-content: center;
  height: ${({ size }) => `${size}px`};
  margin-bottom: 30px;

  div {
    &:nth-child(2) {
      margin-left: ${({ mode, size }) => {
        if (mode === GameMode.P3) return `${size / 6}px`;
        return `-${size / 3}px`;
      }};
    }

    &:nth-child(3) {
      margin-left: ${({ mode, size }) => {
        if (mode === GameMode.P1) return `-${size / 3}px`;
        return `${size / 6}px`;
      }};
    }
  }
`;

const Role = styled.div<{
  size: number;
  role: PlayerRole;
  isConnected: boolean;
}>`
  ${flexCenter}
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  font-size: ${({ size }) => `${size / 3}px`};
  color: ${({ theme }) => theme.color.sub};
  opacity: 0.9;
  border-radius: 50%;

  background: ${({ theme, role, isConnected }) => {
    if (!isConnected) return theme.color.gray;
    if (role === PlayerRole.J) return theme.color.red;
    return theme.color.orange;
  }};
  border: 3px solid
    ${({ theme, role, isConnected }) => {
      if (!isConnected) return theme.color.darkgray;
      if (role === PlayerRole.J) return theme.color.darkred;
      return theme.color.darkorange;
    }};
  box-shadow: 0px 5px 0px
    ${({ theme, role, isConnected }) => {
      if (!isConnected) return theme.color.darkgray;
      if (role === PlayerRole.J) return theme.color.darkred;
      return theme.color.darkorange;
    }};
`;

RoleList.defaultProps = {
  size: 50,
  playerList: [],
  selection: false,
};

export default RoleList;
