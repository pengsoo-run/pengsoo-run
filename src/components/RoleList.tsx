import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { GameMode, Player, PlayerRole } from '~/types/game.type';
import { getRoleList, getRoleListByMode } from '~/util/gameUI';

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

      filtered.push(...getRoleList(player.role));
    }

    setConnectedPlayer(filtered);
  }, [playerList]);

  return (
    <Layout mode={mode} size={size}>
      {getRoleListByMode(mode).map(role => (
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
        return `${size / (mode === GameMode.P3 ? 6 : -3)}px`;
      }};
    }

    &:nth-child(3) {
      margin-left: ${({ mode, size }) => {
        return `${size / (mode === GameMode.P1 ? -3 : 6)}px`;
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

  background: ${({ theme: { color }, role, isConnected }) => {
    if (!isConnected) return color.gray;
    return role === PlayerRole.J ? color.red : color.orange;
  }};
  border: 3px solid
    ${({ theme: { color }, role, isConnected }) => {
      if (!isConnected) return color.darkgray;
      return role === PlayerRole.J ? color.darkred : color.darkorange;
    }};
  box-shadow: 0px 5px 0px
    ${({ theme: { color }, role, isConnected }) => {
      if (!isConnected) return color.darkgray;
      return role === PlayerRole.J ? color.darkred : color.darkorange;
    }};
`;

RoleList.defaultProps = {
  size: 50,
  playerList: [],
  selection: false,
};

export default RoleList;
