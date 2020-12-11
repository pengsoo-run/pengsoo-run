import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '~/store';

type GameMode = '1player' | '2player';
type Direction = 'left' | 'right' | 'jump';

interface Player {
  name: string;
  socketId: number;
  role: Direction[];
}

interface GameState {
  id: string | null;
  playerList: Player[];
  mode?: GameMode;
  isPlaying: boolean;
}

// const initialState: GameState = {
//   id: null,
//   playerList: [],
//   isPlaying: false,
// };

const initialState: GameState = {
  id: '2879523487',
  playerList: [{ name: '당근', socketId: 13254, role: ['jump'] }],
  isPlaying: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame(state) {
      state.isPlaying = true;
    },
    endGame(state) {
      state.isPlaying = false;
    },
    initGame(state, action: PayloadAction<{ id: string; mode: GameMode }>) {
      state.id = action.payload.id;
      state.mode = action.payload.mode;
    },
    addPlayer(state, action: PayloadAction<Player>) {
      state.playerList.push(action.payload);
    },
    deletePlayer(state, action: PayloadAction<Player>) {
      // state
    },
  },
});

// Actions
export const {
  startGame,
  endGame,
  initGame,
  addPlayer,
  deletePlayer,
} = gameSlice.actions;

// Selectors
export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;
