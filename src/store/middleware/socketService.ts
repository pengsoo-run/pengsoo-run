import io from 'socket.io-client';

import { ActionCreator, AnyAction, Dispatch } from 'redux';
import {
  initGame,
  onError,
  resetGame,
  updateGameProgress,
  updatePlayerList,
} from '../gameSlice';
import { createPlayer } from '../playerSlice';

export default class SocketService {
  public socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;
  private dispatch!: Dispatch;

  constructor(private url: string) {}

  public init(): SocketService {
    this.socket = io(this.url);

    this.socket.on('connect', () => console.log('socket connected'));

    return this;
  }

  public subscribe(dispatch: Dispatch): void {
    this.dispatch = dispatch;

    this.listen('createGame', initGame);
    this.listen('joinGame', createPlayer);
    this.listen('updatePlayerList', updatePlayerList);
    this.listen('updateGameProgress', updateGameProgress);
    this.listen('destroyGame', resetGame);

    this.listen('error', onError);
  }

  public interceptAction(action: AnyAction): boolean {
    const [prefix, name] = this.useActionType(action.type);

    if (prefix === 'event') {
      this.socket.emit(name, action.payload);
      return true;
    }

    if (name === 'resetGame') {
      this.removeGameListener();
    }

    return false;
  }

  private listen(ev: string, action: ActionCreator<AnyAction>) {
    this.socket.on(ev, (payload: any) => {
      this.dispatch(action(payload));
    });
  }

  private useActionType(type: string): string[] {
    const splited = type.split('/');
    return [splited[0], splited[1]];
  }

  private removeGameListener(): void {
    this.socket.off('buttonDown');
    this.socket.off('buttonUp');
  }
}
