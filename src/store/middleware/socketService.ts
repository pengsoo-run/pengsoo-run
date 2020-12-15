import io from 'socket.io-client';

import { Game, GameMode } from '../../types/game.type';

class SocketService {
  private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

  public init(): SocketService {
    console.log('init socket service!');

    this.socket = io(process.env.SERVER_URL);

    this.socket.on('connect', () => {
      console.log('socket connected! ', this.socket.id);
    });

    return this;
  }

  public createGame(mode: GameMode, callback: (arg: Game) => void): void {
    this.socket.emit('create-game', mode, callback);
  }

  public onMessage(callback: (arg: any) => void): void {
    this.socket.on('message', callback);
  }

  public disconnect(): void {
    console.log('disconnect!');
    this.socket.disconnect();
  }
}

const socketService = new SocketService();

export default socketService;
