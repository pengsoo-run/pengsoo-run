import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    startGame(state) {
      state.isPlaying = true;
    },
    updatePlayerList(state, action: PayloadAction<Player[]>) {
      state.playerList = action.payload;
    },
    resetGame(state) {
      return initialState;
    },
  },
});

export const {
  initGame,
  startGame,
  updatePlayerList,
  resetGame,
} = gameSlice.actions;

export const createGame = createAction<GameMode>('event/createGame');
export const joinGame = createAction<Game>('event/joinGame');

export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;
