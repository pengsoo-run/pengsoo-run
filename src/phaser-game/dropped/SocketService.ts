import io from 'socket.io-client';

export class SocketService {
  private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

  public init(): SocketService {
    console.log('initiating socket service');
    this.socket = io('localhost:8080', {
      transports: ['websocket'],
      upgrade: false,
      forceNew: true,
    });
    return this;
  }

  // send a message for the server to broadcast
  public joinRoom(room: string): void {
    console.log('joinRoom...' + room);
    this.socket.emit('joinRoom', room);
  }

  public onMessage(callback: (arg: any) => void): void {
    this.socket.on('message', callback);
  }

  // disconnect - used when unmounting
  public disconnect(): void {
    console.log('disconnect!');
    this.socket.disconnect();
  }
}
