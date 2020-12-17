import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '.';
import { Game, GameMode, GameProgress, Player } from '../types/game.type';

const initialState: Game = {
  id: '',
  mode: null,
  progress: GameProgress.WAITING,
  playerList: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initGame(state, action: PayloadAction<Game>) {
      return action.payload;
    },
    updatePlayerList(state, action: PayloadAction<Player[]>) {
      state.playerList = action.payload;
    },
    updateGameProgress(state, action: PayloadAction<GameProgress>) {
      state.progress = action.payload;
    },
    resetGame(state) {
      return initialState;
    },
  },
});

export const {
  initGame,
  updatePlayerList,
  updateGameProgress,
  resetGame,
} = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;
export const selectGameProgress = (state: RootState) => state.game.progress;

export const createGame = createAction<GameMode>('event/createGame');

export default gameSlice.reducer;
