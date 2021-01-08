import { GameMode, PlayerRole } from '~/types/game.type';

export function getRoleList(role: PlayerRole): PlayerRole[] {
  if (role === PlayerRole.ALL) {
    return [PlayerRole.L, PlayerRole.R, PlayerRole.J];
  }

  if (role === PlayerRole.LR) {
    return [PlayerRole.L, PlayerRole.R];
  }

  return [role];
}

export function getRoleListByMode(mode: GameMode): PlayerRole[] {
  return mode === GameMode.P2
    ? [PlayerRole.L, PlayerRole.R, PlayerRole.J]
    : [PlayerRole.L, PlayerRole.J, PlayerRole.R];
}

export function getGamePadUrl(gameId: string): string {
  return `https://${window.location.host}/gamepad/${gameId}`;
}
