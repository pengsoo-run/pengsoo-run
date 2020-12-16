import { Middleware, MiddlewareAPI, Dispatch, Action } from 'redux';
import io from 'socket.io-client';

import { Game, GameMode } from '../../types/game.type';
import { initGame } from '../gameSlice';

function createSocketMiddleware(url: string): Middleware {
  return ({ dispatch }: MiddlewareAPI) => {
    const socket = io(url);

    socket.on('connect', () => {
      console.log('socket connected :', socket.id);
    });

    socket.on('createdGame', (game: Game) => {
      dispatch(initGame(game));
    });

    socket.on('joinedGame', () => {});

    socket.on('destroyedGame', () => {});

    socket.on('updatedPlayer', () => {});

    return (next: Dispatch) => (action: Action) => {
      if (action.type == 'SEND_WEBSOCKET_MESSAGE') {
        // socket.emit(action.payload);
        return;
      }

      return next(action);
    };
  };
}
