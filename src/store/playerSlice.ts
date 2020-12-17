import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '.';
import { PlayerRole, Player } from '../types/game.type';

const initialState: Player = {
  id: null,
  role: null,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    createPlayer(state, action: PayloadAction<Player>) {
      return action.payload;
    },
    destroyPlayer(state) {
      return initialState;
    },
  },
});

export const { createPlayer, destroyPlayer } = playerSlice.actions;

export const joinGame = createAction<string>('event/joinGame');
export const buttonDown = createAction<any>('event/buttonDown');
export const buttonUp = createAction<any>('event/buttonUp');

export const selectPlayer = (state: RootState) => state.player;

export default playerSlice.reducer;
