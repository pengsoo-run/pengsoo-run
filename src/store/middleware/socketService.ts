import io from 'socket.io-client';
import { ActionCreator, AnyAction, Dispatch } from 'redux';

import {
  initGame,
  onError,
  resetGame,
  updateGameProgress,
  updatePlayerList,
} from '../gameSlice';
import { createPlayer, destroyPlayer } from '../playerSlice';
import { EVENT } from '~/constants/Event';

export default class SocketService {
  public socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;
  private dispatch!: Dispatch;

  constructor(private url: string) {}

  public init(): SocketService {
    this.socket = io(this.url, { transports: ['websocket'] });

    this.socket.on('connect', () => console.log('socket connected'));

    return this;
  }

  public subscribe(dispatch: Dispatch): void {
    this.dispatch = dispatch;

    this.listen(EVENT.CREATE_GAME, initGame);
    this.listen(EVENT.JOIN_GAME, createPlayer);
    this.listen(EVENT.LEAVE_GAME, destroyPlayer);
    this.listen(EVENT.UPDATE_PLAYERLIST, updatePlayerList);
    this.listen(EVENT.UPDATE_GAME_PROGRESS, updateGameProgress);
    this.listen(EVENT.DESTROY_GAME, resetGame);

    this.listen(EVENT.MESSAGE, onError);
  }

  public interceptAction(action: AnyAction): boolean {
    const [prefix, name] = this.useActionType(action.type);

    if (prefix === 'event') {
      this.socket.emit(name, action.payload);
      return true;
    }

    if (name === EVENT.RESET_GAME) {
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
    this.socket.off(EVENT.BUTTON_DOWN);
    this.socket.off(EVENT.BUTTON_UP);
  }
}
