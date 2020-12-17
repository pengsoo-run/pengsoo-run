import { Middleware, MiddlewareAPI, Dispatch, Action } from 'redux';

import SocketService from './socketService';

const serverUrl = process.env.SERVER_URL as string;
export const serviceInstance = new SocketService(serverUrl);

export function createSocketMiddleware(): Middleware {
  return ({ dispatch }: MiddlewareAPI) => {
    serviceInstance.init();
    serviceInstance.subscribe(dispatch);

    return (next: Dispatch) => (action: Action) => {
      const isIntercepted = serviceInstance.interceptAction(action);

      if (isIntercepted) return;

      return next(action);
    };
  };
}
