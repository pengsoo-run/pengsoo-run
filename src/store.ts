import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import gameReducer from './features/game/gameSlice';

const middleware = [...getDefaultMiddleware(), logger];

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
