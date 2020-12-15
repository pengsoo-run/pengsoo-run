import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '.';
import { Game, GameMode, Player } from '../types/game.type';

const initialState: Game = {
  id: null,
  mode: null,
  isPlaying: false,
  playerList: [],
  remainingRole: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initGame(state, action: PayloadAction<Game>) {
      return action.payload;
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

export const {
  initGame,
  addPlayer,
  deletePlayer,
  startGame,
  resetGame,
} = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;
