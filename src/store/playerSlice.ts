import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '.';
import { Player } from '~/types/game.type';
import { EVENT } from '~/constants/Event';

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

export const joinGame = createAction<string>('event/' + EVENT.JOIN_GAME);
export const leaveGame = createAction<string>('event/' + EVENT.LEAVE_GAME);
export const buttonDown = createAction<any>('event/' + EVENT.BUTTON_DOWN);
export const buttonUp = createAction<any>('event/' + EVENT.BUTTON_UP);

export const selectPlayer = (state: RootState) => state.player;

export default playerSlice.reducer;
