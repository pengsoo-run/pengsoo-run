export const enum GameMode {
  P1 = '1 Player',
  P2 = '2 Player',
  P3 = '3 Player',
}

export const enum GameRole {
  ALL = 'all',
  LR = 'left-right',
  J = 'jump',
  L = 'left',
  R = 'right',
}

export interface Player {
  id: string;
  role: GameRole;
}

export interface Game {
  id: string | null;
  mode: GameMode | null;
  isPlaying: boolean;
  playerList: Player[];
  remainingRole: GameRole[];
}
