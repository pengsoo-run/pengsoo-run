export const GAME_MODE = {
  P1: '1 Player',
  P2: '2 Player',
  P3: '3 Player',
} as const;

export type GAME_MODE = typeof GAME_MODE[keyof typeof GAME_MODE];

export const GAME_ROLE = {
  ALL: 'all',
  LR: 'left-right',
  J: 'jump',
  L: 'left',
  R: 'right',
} as const;

export type GAME_ROLE = typeof GAME_ROLE[keyof typeof GAME_ROLE];

export interface IPlayer {
  id: string;
  role: GAME_ROLE;
}

export interface IGame {
  id: string;
  playerCount: number;
  playerList: IPlayer[];
  remainingRole: GAME_ROLE[];
  isPlaying: boolean;
}

// interface GameState {
//   currentGame: Game | null;
//   error: string | null;
// }
