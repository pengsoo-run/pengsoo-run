import { Middleware, MiddlewareAPI, Dispatch, Action } from 'redux';

import SocketService from './socketService';
import { initGame } from '../gameSlice';

export function createSocketMiddleware(url: string): Middleware {
  return ({ dispatch }: MiddlewareAPI) => {
    const serviceInstance = new SocketService(url);

    serviceInstance.init();
    serviceInstance.subscribe(dispatch);

    return (next: Dispatch) => (action: Action) => {
      const isIntercepted = serviceInstance.interceptAction(action);

      if (isIntercepted) return;

      return next(action);
    };
  };
}
