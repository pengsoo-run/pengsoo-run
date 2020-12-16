import io from 'socket.io-client';

import { ActionCreator, AnyAction, Dispatch } from 'redux';
import { Game, GameMode } from '../../types/game.type';

import { initGame, resetGame, startGame, updatePlayerList } from '../gameSlice';

export default class SocketService {
  private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;
  private dispatch!: Dispatch;

  constructor(private url: string) {}

  public init(): SocketService {
    this.socket = io(this.url);

    this.socket.on('connect', () => {
      console.log('socket connected : ', this.socket.id);
    });

    return this;
  }

  public subscribe(dispatch: Dispatch): void {
    this.dispatch = dispatch;

    this.listen('createGame', initGame);
    this.listen('startGame', startGame);
    this.listen('updatePlayerList', updatePlayerList);
    this.listen('destroyGame', resetGame);
  }

  public interceptAction(action: AnyAction): boolean {
    const [prefix, name] = this.useActionType(action.type);

    if (prefix === 'event') {
      this.socket.emit(name, action.payload);
      console.log('✅intercept ', name, action.payload);
      return true;
    }

    return false;
  }

  private listen(ev: string, action: ActionCreator<AnyAction>) {
    console.log('리스너 on ', ev);

    this.socket.on(ev, (payload: any) => {
      this.dispatch(action(payload));
    });
  }

  private useActionType(type: string): string[] {
    const splited = type.split('/');
    return [splited[0], splited[1]];
  }

  public createGame(mode: GameMode, callback: (arg: Game) => void): void {
    this.socket.emit('create-game', mode, callback);
  }

  // public joinGame(gameId: string, callback: (arg: Game) => void): void {
  //   this.socket.emit('join-game', gameId, callback);
  // }

  // public onMessage(callback: (arg: any) => void): void {
  //   this.listen('message');
  // }

  public disconnect(): void {
    console.log('disconnect!');
    this.socket.disconnect();
  }
}
