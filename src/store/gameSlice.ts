import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '.';

export type GameMode = '1 Player' | '2 Player';
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

const initialState: GameState = {
  id: null,
  playerList: [],
  isPlaying: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
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
    startGame(state) {
      state.isPlaying = true;
    },
    resetGame(state) {
      return initialState;
    },
  },
});

// Actions
export const {
  initGame,
  addPlayer,
  deletePlayer,
  startGame,
  resetGame,
} = gameSlice.actions;

// Selectors
export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;
