import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { createSocketMiddleware } from './middleware';
import gameReducer from './gameSlice';

const serverUrl = process.env.SERVER_URL as string;
const middleware = [
  ...getDefaultMiddleware(),
  createSocketMiddleware(serverUrl),
];

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
