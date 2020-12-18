import { Middleware, MiddlewareAPI, Dispatch, Action } from 'redux';

import SocketService from './socketService';

export const serviceInstance = new SocketService(
  'https://pengsoo-run-dev.ap-northeast-2.elasticbeanstalk.com:444',
);

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
