import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '.';
import { Game, GameProgress, Player } from '../types/game.type';

const initialState: Game = {
  id: '',
  mode: null,
  progress: GameProgress.WAITING,
  playerList: [],
  error: null,
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
      state.error = null;
    },
    updateGameProgress(state, action: PayloadAction<GameProgress>) {
      state.progress = action.payload;
      state.error = null;
    },
    resetGame(state) {
      return initialState;
    },
    onError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const {
  initGame,
  updatePlayerList,
  updateGameProgress,
  resetGame,
  onError,
} = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;
export const selectGameProgress = (state: RootState) => state.game.progress;
export const selectError = (state: RootState) => state.game.error;

export const createGame = createAction<string>('event/createGame');
export const startGame = createAction<string>('event/startGame');
export const destroyGame = createAction<string>('event/destroyGame');

export default gameSlice.reducer;
