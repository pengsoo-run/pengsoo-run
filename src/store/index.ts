import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import gameReducer from './gameSlice';

const middleware = [...getDefaultMiddleware()];

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
