export const enum SocketEvents {
  CONNECT = 'connect',
}

export const enum GameEvents {
  CREATE = 'game/create',
  JOIN = 'game/join',
  DESTROY = 'game/destroy',
  CREATED = 'game/created',
  JOINED = 'game/joined',
  DESTROYED = 'game/destroyed',
}

export const enum GamepadEvents {
  P1 = '1 Player',
  P2 = '2 Player',
  P3 = '3 Player',
}
