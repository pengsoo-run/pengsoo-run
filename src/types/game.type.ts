export const enum GameMode {
  P1 = '1 Player',
  P2 = '2 Player',
  P3 = '3 Player',
}

export const enum GameProgress {
  WAITING = 'waiting',
  PLAYING = 'playing',
  GAMEOVER = 'gameover',
}

export const enum PlayerRole {
  ALL = 'all',
  LR = 'left-right',
  J = 'jump',
  L = 'left',
  R = 'right',
}

export interface Player {
  id: string | null;
  role: PlayerRole | null;
}

export interface Game {
  id: string;
  hostId: string;
  mode: GameMode | null;
  progress: GameProgress;
  playerList: Player[];
  error: string | null;
}
