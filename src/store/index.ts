import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { createSocketMiddleware } from './middleware';

import gameReducer from './gameSlice';
import playerReducer from './playerSlice';

const middleware = [...getDefaultMiddleware(), createSocketMiddleware()];

export const store = configureStore({
  reducer: {
    game: gameReducer,
    player: playerReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
