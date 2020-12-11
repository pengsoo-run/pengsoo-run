import Phaser from 'phaser';
import io from 'socket.io-client';

import { config } from './game/GameConfig';

import './styles/main.scss';

window.onload = function () {
  new Phaser.Game(config);

  const socket = io('http://localhost:8080');

  socket.on('connect', function () {
    console.log('SOCKET IO CONNECTED', socket.id);
    socket.emit('chat', 'TEST');
  });
};
